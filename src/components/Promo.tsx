import React from 'react';
import { Link } from 'react-router-dom';

export default function Promo({ isDismissVisible, setIsDismissVisible }: any) {
	const handleDismiss = () => {
		setIsDismissVisible(false);
	};

	return isDismissVisible ? (
		<ul className="hidden md:flex items-center space-x-6">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="rounded-lg bg-yellow-600 p-1 shadow-lg ">
					<div className="flex flex-wrap items-center justify-between">
						<div className="flex w-96 flex-1 items-center ">
							<span className="flex rounded-lg bg-sky-800 p-1 animate-bounce">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									aria-hidden="true"
									className="h-4 w-4 text-white"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
									></path>
								</svg>
							</span>
							<p className="ml-3 text-xs truncate font-medium text-white">
								<span className="md:hidden">
									Save 50% on any plan with Code 'LAUNCH'
								</span>
								<span className="hidden md:inline">
									Launch Month! Discover & read more
								</span>
							</p>
						</div>
						<div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
							<Link
								className="flex items-center justify-center rounded-md border border-transparent bg-white px-2 py-1 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50 animate-pulse"
								to="/all-books"
							>
								Get Started
							</Link>
						</div>
						<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
							<button
								type="button"
								onClick={handleDismiss}
								className="-mr-1 flex rounded-md p-2 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-white"
							>
								<span className="sr-only">Dismiss</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-6 w-6 text-white"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</ul>
	) : null;
}
