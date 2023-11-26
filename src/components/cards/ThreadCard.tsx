import Image from 'next/image'
import Link from 'next/link'
import DeleteThread from './DeleteThread'

interface ThreadCardProps {
	id: string
	currentUserId: string
	parentId: string | null
	content: string
	author: {
		id: string
		name: string
		image: string
	}
	community: {
		id: string
		name: string
		image: string
	} | null
	comments: {
		author: {
			image: string
		}
	}[]
	isComment?: boolean
	createdAt: string
}

const ThreadCard = ({
	id,
	currentUserId,
	parentId,
	content,
	author,
	community,
	comments,
	createdAt,
	isComment,
}: ThreadCardProps) => {
	return (
		<article
			className={`${
				isComment ? 'bg-transparent p-0 max-h-fit mb-[-15px]' : ''
			} bg-dark-2 w-full  p-7 rounded-lg`}
		>
			<div
				className={`${
					isComment ? 'min-h-[130px]' : ''
				} flex gap-4 relative h-full`}
			>
				<div className='flex flex-col items-center'>
					<Link href={`/profile/${author.id}`}>
						<Image
							src={author.image}
							className='rounded-full object-cover'
							alt='user image'
							width={44}
							height={44}
						/>
					</Link>
					<div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800'></div>
				</div>
				<div className='text-white flex flex-col gap-3'>
					<Link href={`/profile/${author.id}`} className='w-full'>
						<h4 className='font-semibold'>{author.name}</h4>
					</Link>
					<p className='text-sm'>{content}</p>
					<div className='flex gap-4'>
						<Image
							src='/heart-gray.svg'
							alt='like-image'
							width={24}
							height={24}
						/>
						<Link href={`/thread/${id}`}>
							<Image src='/reply.svg' alt='like-image' width={24} height={24} />
						</Link>
						<Image src='/repost.svg' alt='like-image' width={24} height={24} />
						<Image src='/share.svg' alt='like-image' width={24} height={24} />
					</div>

					{isComment && comments.length > 0 && (
						<Link href={`/thread/${id}`}>
							<p className='text-gray-500 text-xs pt-2 pb-8'>
								{comments.length}
								{' repl'}
								{comments.length > 1 ? 'ies' : 'y'}
							</p>
						</Link>
					)}
				</div>

				<DeleteThread
					currentUserId={currentUserId}
					authorId={author.id}
					isComment={isComment}
				/>
			</div>
			<div className='flex items-center gap-2 pl-1 mt-4'>
				{!isComment &&
					comments.length > 0 &&
					comments
						.slice(0, 2)
						.map((comment, index) => (
							<Image
								src={comment.author.image}
								key={index}
								alt={`user_${index} image`}
								width={24}
								height={24}
								className={`rounded-full object-contain ${
									index > 0 && 'ml-[-20px]'
								}`}
							/>
						))}
				{!isComment && comments.length > 0 && (
					<Link href={`/thread/${id}`}>
						<p className='text-gray-500 text-xs'>
							{comments.length}
							{' repl'}
							{comments.length > 1 ? 'ies' : 'y'}
						</p>
					</Link>
				)}
			</div>
		</article>
	)
}
export default ThreadCard
