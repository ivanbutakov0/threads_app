'use server'

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
