import CommunityTabs from '@/components/shared/CommunityTabs'
import ProfileHeader from '@/components/shared/ProfileHeader'
import { fetchCommunityDetails } from '@/lib/actions/community.actions'
import { currentUser } from '@clerk/nextjs'

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser()
	if (!user) return null

	const communityDetails = await fetchCommunityDetails(params.id)

	return (
		<section>
			<ProfileHeader
				accountId={communityDetails.id}
				authUserId={user.id}
				name={communityDetails.name}
				username={communityDetails.username}
				image={communityDetails.image}
				bio={communityDetails.bio}
				type='Community'
			/>

			<CommunityTabs
				currentUserId={user.id}
				communityDetails={communityDetails}
			/>
		</section>
	)
}
export default Page
