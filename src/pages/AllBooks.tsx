import { useAppDispatch, useAppSelector } from '@/app/hook';
import BookCard from '@/components/BookCard';
import DropdownFilter from '@/components/DropdownFilter';
import Filter from '@/components/Filter';
import FilterSVG from '@/components/FilterSVG';
import Skeleton from '@/components/Skeleton';
import { warningMessage } from '@/helpers/Warning';
import { useGetAllBooksQuery } from '@/rtk/features/book/bookApi';
import { clearFilters, searchFiltered } from '@/rtk/features/book/bookSlice';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { IBook } from '@/types/globalTypes';
import { debounce, size } from 'lodash';
import { useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

export default function AllBooks() {
	const dispatch = useAppDispatch();
	const { selectedGenres, searchQuery } = useAppSelector(
		(state) => state.booksFilter
	);
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const [year, setYear] = useState<Date | undefined>(undefined);
	const handleYearChange = (date: Date) => {
		setYear(date);
	};
	const handleClearFilters = () => {
		dispatch(clearFilters());
		setYear(undefined);
		if (searchInputRef.current) {
			searchInputRef.current.value = '';
		}
	};
	const handleSearch = debounce(
		(value) => dispatch(searchFiltered(value)),
		600
	);
	let selectedYear;
	if (year) {
		selectedYear = year.getFullYear();
	}

	const filterOptions = {
		genre: selectedGenres.join(),
		year: selectedYear,
		searchTerm: searchQuery,
	};

	// console.log(filterOptions, 'selectedGenres');
	const {
		data: books,
		isLoading,
		isError,
	} = useGetAllBooksQuery(filterOptions);
	return (
		<main className="py-12 px-6 2xl:px-6 container">
			<div className="order-2 xl:-order-1">
				<div className="flex items-center justify-between mb-2">
					<h4 className="mt-2 text-xl font-bold">📑 Book List </h4>

					<div className="flex items-center space-x-4">
						<div className="my-2 flex sm:flex-row flex-col">
							<div className="flex flex-row mb-1 sm:mb-0">
								<div className="relative">
									<DropdownFilter />
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
										<svg
											className="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
								<div className="relative bg-stone-100 ">
									<ReactDatePicker
										autoComplete="off"
										id="yearInput"
										className="!block !px-4 text-white !w-36 !outline-none !shadow-none !drop-shadow-none !appearance-none !ring-offset-0 !ring-0 border  !focus:outline-0 !rounded-none"
										selected={year}
										name="publicationDate"
										dateFormat="yyyy"
										showYearPicker
										placeholderText="Select the year"
										onChange={handleYearChange}
										required
									/>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg
											className="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							<div className="block relative h-full">
								<span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
									<svg
										viewBox="0 0 24 24"
										className="h-4 w-4 fill-current text-gray-500"
									>
										<path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
									</svg>
								</span>
								<input
									ref={searchInputRef}
									onChange={(e) => handleSearch(e.target.value)}
									placeholder="Search"
									className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-[9px] w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
								/>
							</div>
						</div>
						<button
							onClick={handleClearFilters}
							className="hover:text-orange-400 flex gap-2 justify-between items-center"
						>
							<FilterSVG />
							<p>Clear filters</p>
						</button>
					</div>
				</div>
				<Filter />
				{(() => {
					if (isLoading) {
						return (
							<div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
								{' '}
								<Skeleton />
								<Skeleton />
								<Skeleton />
							</div>
						);
					}
					if (isError) {
						return warningMessage('There was an error ocurred!');
					}
					if (size(books.data)) {
						return (
							<div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
								{books?.data?.map((book: Partial<IBook>) => (
									<BookCard key={book?._id} book={book} />
								))}
							</div>
						);
					}
					return warningMessage('We did not find anything to show here. ⚠️');
				})()}
			</div>
		</main>
	);
}
