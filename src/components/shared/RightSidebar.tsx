const RightSidebar = () => {
	return (
		<section className='custom-scrollbar z-20 sticky h-screen right-0 top-0 pt-28 w-fit bg-dark-2 overflow-auto max-xl:hidden flex flex-col gap-4 border-l border-l-dark-4 px-10 pb-6'>
			<div className='flex-1 flex flex-col gap-7'>
				<h3 className='text-white text-xl font-medium'>
					Suggested Communities
				</h3>
				<p className='text-light-1'>No communities yet</p>
			</div>

			<div className='flex-1 flex flex-col gap-4'>
				<h3 className='text-white text-xl font-medium'>Similar Minds</h3>
				<p className='text-light-1'>No users yet</p>
			</div>
		</section>
	)
}
export default RightSidebar
