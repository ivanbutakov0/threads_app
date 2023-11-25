import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/constants'
import { fetchUserThreads } from '@/lib/actions/user.actions'
import Image from 'next/image'
import ThreadsTab, { Thread } from './ThreadsTab'

export interface UserThreads {
	id: string
	name: string
	image: string
	threads: Thread[]
}

interface Props {
	currentUserId: string
	accountId: string
}

const ProfileTabs = async ({ currentUserId, accountId }: Props) => {
	const userThreads: UserThreads = await fetchUserThreads(accountId)

	const userThreadsAmount = userThreads.threads.filter(
		thread => !thread['parentId']
	).length

	return (
		<Tabs defaultValue='threads' className='pt-5'>
			<TabsList className='flex w-full bg-dark-2 p-0 min-h-[50px]'>
				{profileTabs.map(tab => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className='flex-1 flex gap-2 text-base bg-dark-2 data-[state=active]:bg-dark-3 data-[state=active]:text-gray-300 h-full'
					>
						<Image src={tab.icon} alt='tab-icon' width={24} height={24} />
						<p>{tab.label}</p>
						{tab.label === 'Threads' && (
							<p className='ml-1 py-1 px-2 rounded-sm bg-gray-500 text-xs text-white'>
								{userThreadsAmount}
							</p>
						)}
					</TabsTrigger>
				))}
			</TabsList>
			{profileTabs.map(tab => (
				<TabsContent key={`content-${tab.label}`} value={tab.value}>
					<ThreadsTab
						currentUserId={currentUserId}
						accountId={accountId}
						tab={tab.label}
						accountType='User'
						userThreads={userThreads}
					/>
				</TabsContent>
			))}
		</Tabs>
	)
}
export default ProfileTabs
