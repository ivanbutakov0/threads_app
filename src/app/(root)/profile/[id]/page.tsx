import ProfileHeader from '@/components/shared/ProfileHeader'
import ProfileTabs from '@/components/shared/ProfileTabs'
import { FetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser()
	if (!user) return null

	const userInfo = await FetchUser(params.id)

	return (
		<section>
			<ProfileHeader
				accountId={userInfo.id}
				authUserId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				image={userInfo.image}
				bio={userInfo.bio}
			/>

			<ProfileTabs currentUserId={user.id} accountId={userInfo.id} />
		</section>
	)
}
export default Page
