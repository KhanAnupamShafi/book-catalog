import BookCard from '@/components/BookCard';
import Landing from '@/components/Landing';
import NewsLetter from '@/components/NewsLetter';
import Skeleton from '@/components/Skeleton';
import { useGetLatestBooksQuery } from '@/rtk/features/book/bookApi';
import { IBook } from '@/types/globalTypes';
import { ScaleLoader } from 'react-spinners';

export default function Home() {
	const { data: books, isLoading, isError } = useGetLatestBooksQuery(undefined);
	const renderSkeletons = () => {
		const numSkeletons = 2; // Number of Skeleton components to render
		const skeletons = [];

		for (let i = 0; i < numSkeletons; i++) {
			skeletons.push(<ScaleLoader color="#36d7b7" key={`skeleton-${i}`} />);
		}

		return skeletons;
	};
	return (
		<>
			{' '}
			<div className="w-full">
				<Landing />
			</div>
			<div className="w-full text-center mb-">
				<div>{/* <img className="mx-auto" src={hero} alt="" /> */}</div>
				<div className="max-w-[1480px] mx-auto flex flex-col items-center justify-center">
					<h1 className="text-xl font-black text-primary text-start mr-auto uppercase border-b pb-2 mt-10">
						Latest collection
					</h1>
					<div className="h-[1px] w-full bg-slate-300 mb-4"></div>

					<div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
						{isLoading ? (
							renderSkeletons()
						) : isError ? (
							<div>Error fetching data</div>
						) : (
							books?.data?.map((book: Partial<IBook>) => (
								<BookCard key={book?._id} book={book} />
							))
						)}
					</div>
				</div>
				<NewsLetter />
			</div>
		</>
	);
}
