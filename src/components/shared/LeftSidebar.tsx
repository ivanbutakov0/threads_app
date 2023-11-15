'use client'

import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LeftSidebar = () => {
	const pathname = usePathname()

	return (
		<section className='custom-scrollbar sticky h-screen left-0 top-0 pt-28 w-fit bg-dark-2 overflow-auto max-md:hidden border-r border-dark-4 flex flex-col justify-between pb-5'>
			<div className='flex flex-col  justify-between w-full gap-6 px-6'>
				{sidebarLinks.map(link => {
					const isActive = pathname === link.route
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`${
								isActive ? 'bg-primary rounded-lg' : ''
							} flex flex-row gap-4 p-4`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={24}
								height={24}
							/>
							<p className='text-white max-lg:hidden'>{link.label}</p>
						</Link>
					)
				})}
			</div>

			<div className='px-6 '>
				<SignedIn>
					<SignOutButton>
						<div className='flex cursor-pointer p-4 gap-4'>
							<Image
								src='/logout.svg'
								alt='Logout'
								width={24}
								height={24}
							></Image>
							<p className='text-white max-lg:hidden'>Logout</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	)
}
export default LeftSidebar
