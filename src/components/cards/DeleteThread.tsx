'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
	currentUserId: string
	authorId: string
	isComment?: boolean
}

const DeleteThread = ({ currentUserId, authorId, isComment }: Props) => {
	const pathname = usePathname()
	const router = useRouter()

	if (currentUserId !== authorId || pathname === '/') return null

	return (
		<Image
			src='/delete.svg'
			alt='delete thread'
			width={24}
			height={24}
			className={'absolute top-3 right-3 cursor-pointer'}
			onClick={() => {
				// TODO: delete thread
				console.log('DELETE!!!')
				router.push('/')
			}}
		/>
	)
}
export default DeleteThread
