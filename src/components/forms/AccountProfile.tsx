'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UpdateUser } from '@/lib/actions/user.actions'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from '@/lib/utils'
import { UserValidation } from '@/lib/validations/user'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface Props {
	user: {
		id: string
		object_id: string
		username: string
		name: string
		bio: string
		image: string
	}
}

const AccountProfile = ({ user }: Props) => {
	const [files, setFiles] = useState<File[]>([])
	const { startUpload } = useUploadThing('media')
	const path = usePathname()
	const router = useRouter()

	const form = useForm<z.infer<typeof UserValidation>>({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			profile_photo: user.image || '',
			name: user.name || '',
			username: user.username || '',
			bio: user.bio || '',
		},
	})

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChanged: (value: string) => void
	) => {
		e.preventDefault()

		const reader = new FileReader()

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]

			setFiles(Array.from(e.target.files))

			if (!file.type.includes('image')) return

			reader.onload = () => {
				const ImageURL = reader.result?.toString() || ''
				fieldChanged(ImageURL)
			}

			reader.readAsDataURL(file)
		}
	}

	const onSubmit = async (values: z.infer<typeof UserValidation>) => {
		const blob = values.profile_photo

		const hasImageChanged = isBase64Image(blob)

		if (hasImageChanged) {
			const imgUploaded = await startUpload(files)

			if (imgUploaded && imgUploaded[0].url) {
				values.profile_photo = imgUploaded[0].url
			}
		}

		await UpdateUser({
			UserId: user.id,
			bio: values.bio,
			name: values.name,
			username: values.username,
			image: values.profile_photo,
			path: path,
		})

		if (path === '/profile/edit') {
			router.back()
		} else {
			router.push('/')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='profile_photo'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='flex h-24 w-24 items-center justify-center rounded-full bg-dark-4 cursor-pointer'>
								{field.value ? (
									<Image
										src={field.value}
										alt='Profile icon'
										width={96}
										height={96}
										className='rounded-full object-contain'
									/>
								) : (
									<Image
										src='/profile.svg'
										alt='Profile icon'
										width={24}
										height={24}
										className='rounded-full object-contain'
									/>
								)}
							</FormLabel>
							<FormControl className='flex-1 text-white text-base '>
								<Input
									type='file'
									accept='image/*'
									placeholder='Add profile photo'
									className=' border-none bg-transparent file:text-blue file:text-base cursor-pointer'
									onChange={e => handleImage(e, field.onChange)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2'>
							<FormLabel className='text-base font-medium'>Name</FormLabel>
							<FormControl>
								<Input className='account-form_input no-focus' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2'>
							<FormLabel className='text-base font-medium'>Username</FormLabel>
							<FormControl>
								<Input className='account-form_input no-focus' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-2'>
							<FormLabel className='text-base font-medium'>Bio</FormLabel>
							<FormControl>
								<Textarea
									rows={10}
									placeholder='Tell us about yourself'
									className='account-form_input no-focus custom-scrollbar'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='text-base w-full bg-primary'>
					Continue
				</Button>
			</form>
		</Form>
	)
}
export default AccountProfile
