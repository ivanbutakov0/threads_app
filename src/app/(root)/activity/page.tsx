import { FetchUser, getActivity } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Page = async () => {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await FetchUser(user.id)
	if (!userInfo?.onboarded) redirect('/onboarding')

	// get activity
	const activity = await getActivity(userInfo._id)
	return (
		<section>
			<h1 className='head-text mb-10'>Activity</h1>
			<div className='flex flex-col gap-5'>
				{activity.length === 0 ? (
					<p className='text-light-1'>No activity found</p>
				) : (
					<>
						{activity.map(activity => (
							<Link key={activity._id} href={`/thread/${activity.parentId}`}>
								<article className='flex gap-3 items-center rounded-md bg-dark-2 px-5 py-3 '>
									<Image
										src={activity.author.image}
										alt='user image'
										width={20}
										height={20}
										className='rounded-full object-cover'
									/>
									<p className='text-white'>
										<span className='text-primary'>{activity.author.name}</span>{' '}
										replied to your thread
									</p>
								</article>
							</Link>
						))}
					</>
				)}
			</div>
		</section>
	)
}
export default Page
