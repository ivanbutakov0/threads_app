import { fetchCommunityPosts } from '@/lib/actions/community.actions'
import ThreadCard from '../cards/ThreadCard'
import { UserThreads } from './ProfileTabs'

export interface Thread {
	_id: string
	text: string
	parentId: string | null
	author: {
		id: string
		name: string
		image: string
	}
	community: {
		id: string
		name: string
		image: string
	}
	createdAt: string
	children: {
		author: {
			image: string
		}
	}[]
}

interface Result {
	id: string
	name: string
	image: string
	threads: Thread[]
}

interface Props {
	currentUserId: string
	accountId: string
	tab?: string
	accountType: 'User' | 'Community'
	userThreads?: UserThreads
}

const ThreadsTab = async ({
	currentUserId,
	accountId,
	tab,
	accountType,
	userThreads,
}: Props) => {
	let repliesThreads: Thread[] | undefined
	let parentThreads: Thread[] | undefined

	if (accountType === 'Community') {
		parentThreads = (await fetchCommunityPosts(accountId)).threads
	} else {
		// choose only threads that have parentId (so they are replies to threads)
		repliesThreads = userThreads?.threads.filter(thread => thread['parentId'])

		// choose parent threads
		parentThreads = userThreads?.threads.filter(thread => !thread['parentId'])
	}

	return (
		<div className='text-white'>
			{tab === 'Threads' && (
				<div className='flex flex-col gap-3'>
					{parentThreads?.map(thread => (
						<ThreadCard
							key={thread._id}
							id={thread._id}
							author={thread.author}
							comments={thread.children}
							community={thread.community}
							content={thread.text}
							createdAt={thread.createdAt}
							currentUserId={currentUserId}
							parentId={thread.parentId}
						/>
					))}
				</div>
			)}
			{tab === 'Replies' && (
				<div>
					{repliesThreads?.map(thread => (
						<ThreadCard
							key={thread._id}
							id={thread._id}
							author={thread.author}
							comments={thread.children}
							community={thread.community}
							content={thread.text}
							createdAt={thread.createdAt}
							currentUserId={currentUserId}
							parentId={thread.parentId}
						/>
					))}
				</div>
			)}
		</div>
	)
}
export default ThreadsTab
