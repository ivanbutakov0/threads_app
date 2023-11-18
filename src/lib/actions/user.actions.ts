'use server'

import User from '../models/user.model'
import { connectToDatabase } from '../mongoose'

interface UpdateUserParams {
	UserId: string
	name: string
	username: string
	bio: string
	image: string
}
export const UpdateUser = async ({
	UserId,
	name,
	username,
	bio,
	image,
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
	} catch (err: any) {
		throw new Error(`Failed to create/update user: ${err.message}`)
	}
}
