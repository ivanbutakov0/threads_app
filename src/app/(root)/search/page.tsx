import UserCard from '@/components/cards/UserCard'
import { FetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Page = async () => {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await FetchUser(user.id)
	if (!userInfo?.onboarded) redirect('/onboarding')

	const users = await fetchUsers({
		userId: user.id,
		searchString: '',
		pageNumber: 1,
		pageSize: 20,
		orderBy: 'desc',
	})

	return (
		<section className='flex flex-col gap-10'>
			<h1 className='head-text'>Search</h1>

			{/* TODO: Add search input */}

			<div className='w-full flex flex-col items-center'>
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
		</section>
	)
}
export default Page
