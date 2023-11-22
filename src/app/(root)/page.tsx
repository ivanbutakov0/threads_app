import ThreadCard from '@/components/cards/ThreadCard'
import { FetchThreads } from '@/lib/actions/thread.actions'
import { FetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Home() {
	const user = await currentUser()
	if (!user) return null // To avoid typescript error

	const userInfo = await FetchUser(user.id)
	if (!userInfo.onboarded) redirect('/onboarding')

	const result = await FetchThreads(1, 30)

	return (
		<>
			<h1 className='head-text'>Home</h1>
			<section className='mt-10 flex flex-col items-center'>
				{result.posts.length === 0 ? (
					<p className='text-light-1'>No threads found</p>
				) : (
					<>
						{result.posts.map(post => (
							<ThreadCard
								key={post._id}
								id={post._id}
								currentUserId={user?.id}
								parentId={post.parentId}
								content={post.text}
								author={post.author}
								community={post.community}
								comments={post.children}
								createdAt={post.createdAt}
							/>
						))}
					</>
				)}
			</section>
			{/* // TODO: delete below */}
			{/* <UserButton afterSignOutUrl='/' /> */}
		</>
	)
}
