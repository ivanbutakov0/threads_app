import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'

const Topbar = () => {
	return (
		<nav className='bg-dark-2 py-3 px-6 flex w-full items-center top-0 z-30 justify-between fixed'>
			<Link href='/' className='flex items-center gap-4'>
				<Image src='/logo.svg' alt='Logo' width={30} height={30}></Image>
				<p className='text-white text-2xl font-bold max-sm:hidden'>Threads</p>
			</Link>

			<div className='flex items-center gap-3'>
				<div className='block md:hidden'>
					<SignedIn>
						<SignOutButton>
							<div className='cursor-pointer'>
								<Image
									src='/logout.svg'
									alt='Logout'
									width={24}
									height={24}
									className='cursor-pointer'
								></Image>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>

				<OrganizationSwitcher
					appearance={{
						baseTheme: dark,
						elements: {
							organizationSwitcherTrigger: 'py-2 px-4',
						},
					}}
				/>
			</div>
		</nav>
	)
}
export default Topbar
