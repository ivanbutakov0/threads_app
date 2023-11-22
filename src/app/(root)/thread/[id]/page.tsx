import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/Comment'
import { fetchThreadById } from '@/lib/actions/thread.actions'
import { FetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { id: string } }) => {
	if (!params.id) return null

	const user = await currentUser()
	if (!user) return null

	const userInfo = await FetchUser(user.id)
	if (!userInfo.onboarded) redirect('/onboarding')

	const thread = await fetchThreadById(params.id)
	console.log(thread)
	return (
		<section className='flex flex-col gap-10'>
			<div>
				<ThreadCard
					id={thread._id}
					currentUserId={user.id}
					parentId={thread.parentId}
					content={thread.text}
					author={thread.author}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			</div>

			<div className='border-t border-b border-neutral-800 py-5'>
				<Comment
					threadId={thread._id}
					currentUserImg={userInfo.image}
					currentUserId={userInfo._id}
				/>
			</div>

			<div className='mt-10'>
				{thread.children.map((childItem: any) => (
					<ThreadCard
						key={childItem._id}
						id={childItem._id}
						currentUserId={user.id}
						parentId={childItem.parentId}
						content={childItem.text}
						author={childItem.author}
						community={childItem.community}
						comments={childItem.children}
						createdAt={childItem.createdAt}
						isComment
					/>
				))}
			</div>
		</section>
	)
}
export default page
