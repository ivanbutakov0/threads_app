'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'

interface Props {
	routeType: string
}

const Searchbar = ({ routeType }: Props) => {
	const router = useRouter()
	const [searchParams, setSearchParams] = useState('')

	useEffect(() => {
		setTimeout(() => {
			if (searchParams) {
				router.push(`/${routeType}?q=${searchParams}`)
			} else {
				router.push(`/${routeType}`)
			}
		}, 500)
	}, [searchParams, routeType])

	return (
		<div className='flex items-center gap-3'>
			<Image
				src='/search-gray.svg'
				alt='search icon'
				width={24}
				height={24}
			></Image>
			<Input
				onChange={e => {
					setSearchParams(e.target.value)
				}}
				placeholder={`Search ${routeType}`}
				className='text-white no-focus bg-dark-3 border border-dark-4'
			></Input>
		</div>
	)
}
export default Searchbar
