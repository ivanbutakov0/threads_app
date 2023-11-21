import {
	Bottombar,
	LeftSidebar,
	RightSidebar,
	Topbar,
} from '@/components/shared'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Threads',
	description: 'A Next.js 14 Meta Threads clone application',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang='en'>
				<body className={inter.className}>
					<Topbar />

					<main className='flex flex-row'>
						<LeftSidebar />
						<section className='flex justify-center flex-1 min-h-screen bg-dark-1 pt-28 px-5'>
							<div className='w-full max-w-4xl'>{children}</div>
						</section>
						<RightSidebar />
					</main>

					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	)
}
