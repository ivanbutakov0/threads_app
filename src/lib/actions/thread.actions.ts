'use server'

import { revalidatePath } from 'next/cache'
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
