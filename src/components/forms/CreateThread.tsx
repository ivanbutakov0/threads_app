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
import { Textarea } from '@/components/ui/textarea'
import { ThreadValidation } from '@/lib/validations/thread'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface Props {
	userId: string
}
const CreateThread = ({ userId }: Props) => {
	const form = useForm<z.infer<typeof ThreadValidation>>({
		defaultValues: {
			thread: '',
			accountId: userId,
		},
	})

	const onSubmit = (data: z.infer<typeof ThreadValidation>) => {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-10'
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-4'>
							<FormLabel className='text-white'>Content</FormLabel>
							<FormControl>
								<Textarea
									rows={15}
									className='bg-dark-3 border border-dark-4 no-focus text-white'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='bg-primary'>
					Post Thread
				</Button>
			</form>
		</Form>
	)
}
export default CreateThread
