import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const Page = () => {
	return (
		<div className='grid w-full gap-2'>
			<Textarea placeholder='Type your message here.' />
			<Button>Send message</Button>
		</div>
	)
}
export default Page
