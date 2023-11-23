'use client'

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Bottombar = () => {
	const pathname = usePathname()

	return (
		<section className='fixed bottom-0 z-10 w-full rounded-t-3xl flex md:hidden bg-dark-3 sm:bg-opacity-60 sm:backdrop-blur-lg '>
			<div className='flex justify-between w-full py-4 px-7 gap-2 '>
				{sidebarLinks.map(link => {
					const isActive = pathname === link.route
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`${
								isActive && 'bg-primary rounded-lg'
							} flex flex-col items-center gap-2 py-2 px-2 sm:w-full`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={16}
								height={16}
							/>
							<p className='text-white text-xs max-sm:hidden'>
								{link.label.split(' ')[0]}
							</p>
						</Link>
					)
				})}
			</div>
		</section>
	)
}
export default Bottombar
