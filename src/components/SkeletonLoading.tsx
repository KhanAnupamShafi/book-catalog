import React from 'react';

const SkeletonLoader = () => {
	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			<div className="container px-5 py-24 mx-auto animate-pulse">
				<div className="lg:w-4/5 mx-auto flex flex-wrap">
					<div className="lg:w-1/2 w-full object-contain object-center rounded border border-gray-200 bg-gray-300 h-72"></div>
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<div className="w-1/3 h-4 bg-gray-300 mb-4"></div>
						<div className="w-2/3 h-6 bg-gray-300 mb-6"></div>
						<div className="w-1/2 h-4 bg-gray-300 mb-4"></div>
						<div className="w-1/4 h-6 bg-gray-300 mb-6"></div>
						<div className="w-1/2 h-4 bg-gray-300 mb-4"></div>
						<div className="w-1/4 h-6 bg-gray-300 mb-6"></div>
						<div className="w-1/2 h-4 bg-gray-300 mb-4"></div>
						<div className="w-1/4 h-6 bg-gray-300 mb-6"></div>
						<div className="w-1/2 h-4 bg-gray-300 mb-4"></div>
						<div className="w-1/4 h-6 bg-gray-300 mb-6"></div>
						<div className="w-1/2 h-4 bg-gray-300 mb-4"></div>
						<div className="w-1/4 h-6 bg-gray-300 mb-6"></div>
						<div className="w-1/2 h-4 bg-gray-300 mb-4"></div>
						<div className="w-1/4 h-6 bg-gray-300 mb-6"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SkeletonLoader;
