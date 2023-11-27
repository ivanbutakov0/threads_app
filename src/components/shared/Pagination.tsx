'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

interface Props {
	path: string
	pageNumber: number
	isNext: boolean
}

const Pagination = ({ path, pageNumber, isNext }: Props) => {
	const router = useRouter()

	const handleNavigation = (direction: string) => {
		let nextPageNumber = pageNumber
		if (direction === 'prev') {
			nextPageNumber = Math.max(1, pageNumber - 1)
		} else if (direction === 'next') {
			nextPageNumber = pageNumber + 1
		}

		if (nextPageNumber > 1) {
			router.push(`/${path}?page=${nextPageNumber}`)
		} else {
			router.push(`/${path}`)
		}
	}

	// if (!isNext && pageNumber === 1) return null

	return (
		<div className='flex mt-10 items-center justify-center w-full gap-5'>
			<Button
				onClick={() => handleNavigation('prev')}
				disabled={pageNumber === 1}
				className='bg-primary'
			>
				Prev
			</Button>
			<p className='text-white'>{pageNumber}</p>
			<Button
				onClick={() => handleNavigation('next')}
				disabled={!isNext}
				className='bg-primary'
			>
				Next
			</Button>
		</div>
	)
}
export default Pagination
