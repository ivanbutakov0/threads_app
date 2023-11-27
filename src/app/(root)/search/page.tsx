import UserCard from '@/components/cards/UserCard'
import Pagination from '@/components/shared/Pagination'
import Searchbar from '@/components/shared/Searchbar'
import { FetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined }
}) => {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await FetchUser(user.id)
	if (!userInfo?.onboarded) redirect('/onboarding')

	const users = await fetchUsers({
		userId: user.id,
		searchString: searchParams.q,
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: 20,
		orderBy: 'desc',
	})

	return (
		<section className='flex flex-col gap-10 h-full'>
			<h1 className='head-text'>Search</h1>

			<div className='mt-5'>
				<Searchbar routeType='search' />
			</div>

			<div className='w-full flex flex-1 flex-col items-center'>
				{users.users.length === 0 ? (
					<p className='text-light-1'>No Results</p>
				) : (
					<div className='w-full px-5'>
						{users.users.map(user => (
							<UserCard
								key={user.id}
								id={user.id}
								username={user.username}
								name={user.name}
								image={user.image}
							/>
						))}
					</div>
				)}
			</div>

			<Pagination
				path='search'
				pageNumber={searchParams?.page ? +searchParams.page : 1}
				isNext={users.isNext}
			/>
		</section>
	)
}
export default Page
