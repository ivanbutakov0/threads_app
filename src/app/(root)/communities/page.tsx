import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import CommunityCard from '@/components/cards/CommunitiesCard'

import Pagination from '@/components/shared/Pagination'
import Searchbar from '@/components/shared/Searchbar'
import { fetchCommunities } from '@/lib/actions/community.actions'
import { FetchUser } from '@/lib/actions/user.actions'

async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await FetchUser(user.id)
	if (!userInfo?.onboarded) redirect('/onboarding')

	const result = await fetchCommunities({
		searchString: searchParams.q,
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: 25,
	})

	return (
		<div className='h-full flex flex-col'>
			<h1 className='head-text'>Communities</h1>

			<div className='mt-5'>
				<Searchbar routeType='communities' />
			</div>

			<section className='mt-9 flex flex-wrap gap-4 flex-1'>
				{result.communities.length === 0 ? (
					<p className='text-light-1 bloc mx-auto my-0'>No Result</p>
				) : (
					<div>
						{result.communities.map(community => (
							<CommunityCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								imgUrl={community.image}
								bio={community.bio}
								members={community.members}
							/>
						))}
					</div>
				)}
			</section>

			<Pagination
				path='communities'
				pageNumber={searchParams?.page ? +searchParams.page : 1}
				isNext={result.isNext}
			/>
		</div>
	)
}

export default Page
