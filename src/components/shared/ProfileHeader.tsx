import Image from 'next/image'
import Link from 'next/link'

interface Props {
	accountId: string
	authUserId: string
	name: string
	username: string
	image: string
	bio: string
	type?: 'User' | 'Community'
}

const ProfileHeader = ({
	accountId,
	authUserId,
	name,
	username,
	image,
	bio,
	type,
}: Props) => {
	return (
		<div className='text-white flex flex-col gap-5 pb-10 border-b-2 border-dark-3'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-3 items-center'>
					<div className='relative w-20 h-20 object-cover'>
						<Image
							className='rounded-full object-cover'
							src={image}
							alt='profile image'
							fill
						/>
					</div>
					<div>
						<p className='text-2xl font-semibold'>{name}</p>
						<p className='text-gray-500'>@{username}</p>
					</div>
				</div>
				{accountId === authUserId && type !== 'Community' && (
					<div>
						<Link
							href='/profile/edit'
							className='flex gap-2 items-center bg-dark-3 py-2 px-4 rounded-lg'
						>
							<Image src='/edit.svg' alt='edit' width={16} height={16} />
							Edit
						</Link>
					</div>
				)}
			</div>
			<p>{bio}</p>
		</div>
	)
}
export default ProfileHeader
