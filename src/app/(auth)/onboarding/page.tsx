import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs'

const Page = async () => {
	const user = await currentUser()

	const userInfo = null

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
