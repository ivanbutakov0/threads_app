'use server'

import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'
import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectToDatabase } from '../mongoose'

export const FetchUser = async (UserId: string) => {
	try {
		connectToDatabase()

		return await User.findOne({ id: UserId }).populate({
			path: 'communities',
			model: Community,
		})
	} catch (err: any) {
		throw new Error(`Failed to fetch user: ${err.message}`)
	}
}

interface UpdateUserParams {
	UserId: string
	name: string
	username: string
	bio: string
	image: string
	path: string
}
export const UpdateUser = async ({
	UserId,
	name,
	username,
	bio,
	image,
	path,
}: UpdateUserParams): Promise<void> => {
	try {
		connectToDatabase()

		await User.findOneAndUpdate(
			{ id: UserId },
			{
				name,
				username: username.toLowerCase(),
				bio,
				image,
				onboarded: true,
			},
			{
				upsert: true,
			}
		)

		if (path === '/profile/edit') {
			revalidatePath(path)
		}
	} catch (err: any) {
		throw new Error(`Failed to create/update user: ${err.message}`)
	}
}

export const fetchUserThreads = async (userId: string) => {
	try {
		connectToDatabase()

		const threads = await User.findOne({ id: userId }).populate({
			path: 'threads',
			model: Thread,
			populate: [
				{
					path: 'author',
					model: User,
					select: 'name image id',
				},
				{
					path: 'community',
					model: Community,
					select: 'name id image _id',
				},
				{
					path: 'children',
					model: Thread,
					populate: {
						path: 'author',
						model: User,
						select: 'name image id',
					},
				},
			],
		})

		return threads
	} catch (err: any) {
		throw new Error(`Failed to fetch user threads: ${err.message}`)
	}
}

export const fetchUsers = async ({
	userId,
	searchString = '',
	pageNumber = 1,
	pageSize = 20,
	orderBy = 'desc',
}: {
	userId: string
	searchString?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: SortOrder
}) => {
	try {
		connectToDatabase()

		// Calculate the number of users to skip based on the page number and page size.
		const skipAmount = (pageNumber - 1) * pageSize

		const regex = new RegExp(searchString, 'i')

		const query: FilterQuery<typeof User> = {
			id: { $ne: userId },
		}

		if (searchString.trim() !== '') {
			query.$or = [{ name: regex }, { username: regex }]
		}

		const sortOption = {
			createdAt: orderBy,
		}

		const users = await User.find(query)
			.sort(sortOption)
			.skip(skipAmount)
			.limit(pageSize)

		const totalUsers = await User.countDocuments(query)

		const isNext = skipAmount + users.length < totalUsers

		return {
			users,
			isNext,
		}
	} catch (err: any) {
		throw new Error(`Failed to fetch users: ${err.message}`)
	}
}

export const getActivity = async (userId: string) => {
	try {
		connectToDatabase()

		// Find all threads created by the user
		const userThreads = await Thread.find({ author: userId })

		// Collect all the child thread ids (replies) from the 'children' field of each user thread
		const childThreadIds = userThreads.reduce((acc, userThread) => {
			return acc.concat(userThread.children)
		}, [])

		// Find and return the child threads (replies) excluding the ones created by the same user
		const replies = await Thread.find({
			_id: { $in: childThreadIds },
			author: { $ne: userId }, // Exclude threads authored by the same user
		}).populate({
			path: 'author',
			model: User,
			select: 'name image _id',
		})

		return replies
	} catch (err: any) {
		throw new Error(`Failed to fetch activity: ${err.message}`)
	}
}
