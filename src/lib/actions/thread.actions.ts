'use server'

import { revalidatePath } from 'next/cache'
import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import { connectToDatabase } from '../mongoose'

interface Params {
	text: string
	author: string
	communityId: string | null
	path: string
}

export const CreateThreadAction = async ({
	text,
	author,
	communityId,
	path,
}: Params) => {
	try {
		connectToDatabase()

		// TODO: Add community functionality

		const createdThread = await Thread.create({
			text,
			author,
			community: null,
		})

		// Update user
		await User.findByIdAndUpdate(author, {
			$push: {
				threads: createdThread._id,
			},
		})

		revalidatePath(path)
	} catch (err: any) {
		throw new Error(`Failed to create thread: ${err.message}`)
	}
}

export const FetchThreads = async (pageNumber = 1, pageSize = 20) => {
	try {
		connectToDatabase()

		// Calculate the number of posts to skip based on the page number and page size.
		const skipAmount = (pageNumber - 1) * pageSize

		// Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
		const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
			.sort({ createdAt: 'desc' })
			.skip(skipAmount)
			.limit(pageSize)
			.populate({
				path: 'author',
				model: User,
			})
			.populate({
				path: 'community',
				model: Community,
			})
			.populate({
				path: 'children', // Populate the children field
				populate: {
					path: 'author', // Populate the author field within children
					model: User,
					select: '_id name parentId image', // Select only _id and username fields of the author
				},
			})

		// Count the total number of top-level posts (threads) i.e., threads that are not comments.
		const totalPostsCount = await Thread.countDocuments({
			parentId: { $in: [null, undefined] },
		}) // Get the total count of posts

		const posts = await postsQuery.exec()

		const isNext = totalPostsCount > skipAmount + posts.length

		return { posts, isNext }
	} catch (err: any) {
		throw new Error(`Failed to fetch threads: ${err.message}`)
	}
}

export const fetchThreadById = async (id: string) => {
	try {
		connectToDatabase()

		const thread = await Thread.findById(id)
			.populate({
				path: 'author',
				model: User,
				select: '_id id name  image',
			})
			.populate({
				path: 'community',
				model: Community,
				select: '_id id name image',
			})
			.populate({
				path: 'children', // Populate the children field
				populate: [
					{
						path: 'author', // Populate the author field within children
						model: User,
						select: '_id id name parentId image', // Select only _id and username fields of the author
					},
					{
						path: 'children', // Populate the children field within children
						model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
						populate: {
							path: 'author', // Populate the author field within nested children
							model: User,
							select: '_id id name parentId image', // Select only _id and username fields of the author
						},
					},
				],
			})
			.exec()

		return thread
	} catch (err: any) {
		throw new Error(`Failed to fetch thread: ${err.message}`)
	}
}

export const addCommentToThread = async (
	threadId: string,
	commentText: string,
	userId: string,
	path: string
) => {
	try {
		connectToDatabase()

		const originalThread = await fetchThreadById(threadId)

		if (!originalThread) throw new Error('Original thread not found')

		// Create the new comment thread
		const commentThread = new Thread({
			text: commentText,
			author: userId,
			parentId: threadId,
		})

		// Save the new comment thread to the db
		const savedCommentThread = await commentThread.save()

		// Add the comment to the original thread's children array
		originalThread.children.push(savedCommentThread._id)

		// Save original thread
		await originalThread.save()

		await User.findByIdAndUpdate(userId, {
			$push: {
				threads: savedCommentThread,
			},
		})

		revalidatePath(path)
	} catch (err: any) {
		throw new Error(`Failed to add comment to thread: ${err.message}`)
	}
}
