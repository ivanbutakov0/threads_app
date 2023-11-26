import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { communityTabs } from '@/constants'
import Image from 'next/image'
import UserCard from '../cards/UserCard'
import ThreadsTab from './ThreadsTab'

interface Props {
	currentUserId: string
	communityDetails: any
}

const CommunityTabs = async ({ currentUserId, communityDetails }: Props) => {
	return (
		<Tabs defaultValue='threads' className='pt-5'>
			<TabsList className='flex w-full bg-dark-2 p-0 min-h-[50px]'>
				{communityTabs.map(tab => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className='flex-1 flex gap-2 text-base bg-dark-2 data-[state=active]:bg-dark-3 data-[state=active]:text-gray-300 h-full'
					>
						<Image src={tab.icon} alt='tab-icon' width={24} height={24} />
						<p>{tab.label}</p>
						{tab.label === 'Threads' && (
							<p className='ml-1 py-1 px-2 rounded-sm bg-gray-500 text-xs text-white'>
								{communityDetails.threads.length}
							</p>
						)}
					</TabsTrigger>
				))}
			</TabsList>

			<TabsContent value='threads' className='w-full text-light-1'>
				<ThreadsTab
					currentUserId={currentUserId}
					accountId={communityDetails._id}
					accountType='Community'
					tab='Threads'
				/>
			</TabsContent>

			<TabsContent value='members' className='mt-9 w-full text-light-1'>
				<section className='mt-9 flex flex-col gap-10'>
					{communityDetails.members.map((member: any) => (
						<UserCard
							key={member.id}
							id={member.id}
							name={member.name}
							username={member.username}
							image={member.image}
						/>
					))}
				</section>
			</TabsContent>

			<TabsContent value='requests' className='w-full text-light-1'>
				<ThreadsTab
					currentUserId={currentUserId}
					accountId={communityDetails._id}
					accountType='Community'
					tab='Replies'
				/>
			</TabsContent>
		</Tabs>
	)
}
export default CommunityTabs
