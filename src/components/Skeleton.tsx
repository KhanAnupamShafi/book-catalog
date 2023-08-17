export default function Skeleton() {
	return (
		<div className="animate-pulse">
			{/* Skeleton loader for the image */}
			<div className="flex flex-row space-x-1">
				<div className="h-[240px] w-[170px] bg-gray-300"></div>

				{/* Skeleton loader for the book details */}
				<div className="flex-1 h-full pr-2 pt-2 flex flex-col ">
					<div className="flex mt-10 items-center justify-end border-b border-[#dbdbdb] ">
						<div className="text-gray-500 space-x-2"></div>
					</div>
					<div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
					<div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
					<div className="h-4 bg-gray-300 mb-2 w-2/3"></div>
					<div className="h-4 bg-gray-300 mb-2 w-1/3"></div>
					<div className="h-4 bg-gray-300 mb-2 w-4/5"></div>
				</div>
			</div>
		</div>
	);
}
