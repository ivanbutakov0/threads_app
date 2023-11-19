'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDatabase } from '../mongoose'

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
