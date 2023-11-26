import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const isBase64Image = (imageData: string): boolean => {
	// Regular expression for base64 encoded image data
	const base64Pattern = /^data:image\/(png|jpe?g|gif|webp);base64,/

	// Check if the imageData starts with the base64 pattern
	return base64Pattern.test(imageData)
}

export function formatDateString(dateString: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}

	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString(undefined, options)

	const time = date.toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit',
	})

	return `${time} - ${formattedDate}`
}

// created by chatgpt
export function formatThreadCount(count: number): string {
	if (count === 0) {
		return 'No Threads'
	} else {
		const threadCount = count.toString().padStart(2, '0')
		const threadWord = count === 1 ? 'Thread' : 'Threads'
		return `${threadCount} ${threadWord}`
	}
}
