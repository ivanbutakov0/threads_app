import AccountProfile from '@/components/forms/AccountProfile'
import { FetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Page = async () => {
	const user = await currentUser()
	if (!user) return null // To avoid typescript error

	const userInfo = await FetchUser(user.id)

	if (userInfo?.onboarded) redirect('/')

	const userData = {
		id: user?.id,
		object_id: userInfo?._id,
		username: userInfo ? userInfo?.username : user?.username,
		name: userInfo ? userInfo?.name : user?.firstName ?? '',
		bio: userInfo ? userInfo?.bio : '',
		image: userInfo ? userInfo?.image : user?.imageUrl,
	}

	return (
		<main className='onboarding'>
			<h1 className='head-text'>Onboarding</h1>
			<p>Complete your profile now, to use Threads.</p>
			<div className=' bg-dark-2 text-white mt-4 p-10'>
				<AccountProfile user={userData} />
			</div>
		</main>
	)
}
export default Page
