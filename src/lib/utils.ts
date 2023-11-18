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
