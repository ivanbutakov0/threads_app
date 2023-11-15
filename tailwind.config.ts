import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#877eff',
				'dark-1': '#000000',
				'dark-2': '#121417',
				'dark-3': '#101012',
				'dark-4': '#1F1F22',
				'light-1': '#7878A3',
			},
		},
	},
	plugins: [],
}
export default config
