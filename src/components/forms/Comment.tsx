'use client'

import { addCommentToThread } from '@/lib/actions/thread.actions'
import { CommentValidation } from '@/lib/validations/thread'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
	threadId: string
	currentUserImg: string
	currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
	const form = useForm<z.infer<typeof CommentValidation>>({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		await addCommentToThread(threadId, values.thread, currentUserId, '')

		form.reset()
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex items-center w-full'
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex-1 flex gap-3'>
							<FormLabel>
								<Image
									src={currentUserImg}
									alt='user image'
									width={44}
									height={44}
									className='mt-2'
								/>
							</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='Comment...'
									className='no-focus text-base text-white w-full flex-1 bg-inherit border-none'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='rounded-full bg-primary px-8 hover:bg-primary'
				>
					Reply
				</Button>
			</form>
		</Form>
	)
}
export default Comment
