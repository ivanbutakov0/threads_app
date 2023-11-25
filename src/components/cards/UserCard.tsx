'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface Props {
	id: string
	username: string
	name: string
	image: string
}

const UserCard = ({ id, username, name, image }: Props) => {
	const router = useRouter()
	return (
		<article className='flex justify-between'>
			<div className='flex gap-4'>
				<div className='relative w-12 h-12'>
					<Image
						src={image}
						alt='user image'
						fill
						className='rounded-full object-cover'
					/>
				</div>
				<div>
					<p className='text-white font-semibold'>{name}</p>
					<p className='text-gray-500 text-sm'>@{username}</p>
				</div>
			</div>
			<Button
				className='bg-primary px-8 rounded-xl'
				onClick={() => {
					router.push(`/profile/${id}`)
				}}
			>
				View
			</Button>
		</article>
	)
}
export default UserCard
