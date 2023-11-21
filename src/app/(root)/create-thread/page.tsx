import CreateThread from '@/components/forms/CreateThread'
import { FetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Page = async () => {
	const user = await currentUser()
	if (!user) return null // To avoid typescript error

	const userInfo = await FetchUser(user.id)
	if (!userInfo.onboarded) redirect('/onboarding')

	return (
		<>
			<h1 className='head-text mb-10'>Create Thread</h1>
			<CreateThread userId={userInfo._id} />
		</>
	)
}
export default Page
