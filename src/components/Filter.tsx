import { useAppDispatch, useAppSelector } from '@/app/hook';
import { removeGenreOption } from '@/rtk/features/book/bookSlice';
import React, { useState } from 'react';

const Filter = () => {
	const { selectedGenres } = useAppSelector((state) => state.booksFilter);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const toggleFilter = () => {
		setIsOpen(!isOpen);
	};

	const filterHeight = selectedGenres?.length > 0 ? 'h-24' : 'h-0';
	const filterOpacity =
		selectedGenres?.length > 0 ? 'opacity-100' : 'opacity-0';

	return (
		<div
			className={`items-center flex py-6 px-8 transition-all duration-300 ${filterOpacity}`}
		>
			<h3 className="text-gray-500 text-sm font-medium">Filters</h3>
			<div className="ml-2 bg-gray-200 w-0.5 h-6"></div>
			<div className="ml-4">
				<div
					className={`items-center flex flex-wrap -m-1 transition-all duration-500 ${filterHeight} overflow-hidden`}
				>
					{selectedGenres?.map((genre) => (
						<span
							key={genre}
							className="items-center bg-white text-gray-900 flex text-sm font-medium py-1.5 pl-3 pr-2 border border-gray-200 border-solid rounded-full m-1"
						>
							<span>{genre}</span>
							<button
								className="h-4 w-4 items-start text-gray-400 cursor-pointer flex ml-1 text-center rounded-full p-1"
								onClick={() => {
									dispatch(removeGenreOption(genre));
								}}
							>
								<svg
									className="h-2 w-2 stroke-current"
									viewBox="0 0 8 8"
									fill="none"
									strokeWidth="1.5"
								>
									<path d="M1 1l6 6m0-6L1 7"></path>
								</svg>
							</button>
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default Filter;
