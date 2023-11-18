import * as z from 'zod'

export const UserValidation = z.object({
	profile_photo: z.string().url().min(1),
	name: z
		.string()
		.min(2, { message: 'Minimum 2 characters' })
		.max(30, { message: 'Maximum 30 characters' }),
	username: z
		.string()
		.min(2, { message: 'Minimum 2 characters' })
		.max(30, { message: 'Maximum 30 characters' }),
	bio: z
		.string()
		.min(2, { message: 'Minimum 2 characters' })
		.max(1000, { message: 'Maximum 1000 characters' }),
})
