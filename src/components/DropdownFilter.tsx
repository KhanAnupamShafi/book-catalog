import { useAppDispatch, useAppSelector } from '@/app/hook';
import { useGetAllGenresQuery } from '@/rtk/features/book/bookApi';
import { toggleGenreOptions } from '@/rtk/features/book/bookSlice';
import React, { useEffect, useRef, useState } from 'react';

const DropdownFilter = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { selectedGenres } = useAppSelector((state) => state.booksFilter);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	const dispatch = useAppDispatch();
	const { data, isLoading } = useGetAllGenresQuery(undefined);
	// Close dropdown when clicking outside
	useEffect(() => {
		const handleOutsideClick = (event: Event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const checked = event.target.checked;
		dispatch(toggleGenreOptions({ value, checked }));
	};
	return (
		<div className="relative inline-block " ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className="px-4 pr-8 py-2 bg-gray-500 text-white rounded focus:outline-none"
			>
				Select Genre
			</button>
			{isDropdownOpen && (
				<div className="absolute z-10 mt-2 bg-white shadow-md rounded min-w-max">
					{isLoading ? (
						<span>Loading genres...</span>
					) : (
						data?.data.map((genre: string) => (
							<label
								key={genre}
								className="block px-4 py-2 cursor-pointer drop-shadow-xl border-b hover:bg-slate-500 mix-blend-hard-light"
							>
								<input
									type="checkbox"
									className="mr-2 outline outline-1 shadow-xl border-green-900 form-checkbox"
									value={genre}
									onChange={handleCheckboxChange}
									checked={selectedGenres.includes(genre)}
								/>
								{genre}
							</label>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default DropdownFilter;
