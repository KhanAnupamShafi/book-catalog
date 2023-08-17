import { useAppSelector } from '@/app/hook';
import CommentList from '@/components/CommentList';
import CommentPost from '@/components/CommentPost';
import SkeletonLoader from '@/components/SkeletonLoading';
import { toastAlert } from '@/helpers/AppHelper';
import { warningMessage } from '@/helpers/Warning';
import {
	useDeleteBookMutation,
	useGetABookQuery,
	useGetReviewsQuery,
} from '@/rtk/features/book/bookApi';
import LoadingSpinner from '@/shared/LoadingSpinner';
import renderStars from '@/shared/RenderStar';
import { Review } from '@/types/globalTypes';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty, size } from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cover from '../assets/noCover.gif';
import SVG from '../assets/nodata.svg';

export default function BookDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);
	const { data: book, isLoading, isError } = useGetABookQuery({ id });
	// console.log('book?.user:', book?.user);
	// console.log('user?.email:', user?.email);
	// console.log('Comparison result:', book?.user === user?.email, '😅');
	const {
		data: comments,
		isLoading: commentLoading,
		isError: commentError,
	} = useGetReviewsQuery({ id });
	let content;
	if (commentLoading) {
		content = <LoadingSpinner />;
	} else if (commentError) {
		content = warningMessage('There was an error ocurred!');
	} else if (isEmpty(comments)) {
		content = (
			<div className="flex items-center justify-center gap-5">
				<p className="font-bold text-slate-300">No Review yet</p>
				<img src={SVG} width={120} alt="" />
			</div>
		);
	} else if (size(comments))
		content = comments?.map((comment: Review) => (
			<CommentList key={comment.id} comment={comment} />
		));
	const handleClick = () => {
		// console.log('object');
		navigate(`/edit-book/${id}`);
	};
	const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();

	const submitDelete = () => {
		confirmAlert({
			title: `Deleting "${book?.title}"`,
			message: 'Are you sure to do this.',
			buttons: [
				{
					label: 'Yes',
					onClick: () => handleDeleteBook(),
				},
				{
					label: 'No',
					// onClick: () => alert("Click No")
				},
			],
		});
	};

	const handleDeleteBook = () => {
		deleteBook({ id })
			.unwrap()
			.then(() => {
				// Handle successful deletion
				toastAlert('success', 'Deleted successfully');
				navigate(`/all-books`);
			})
			.catch((error) => {
				// Handle error
				toastAlert('error', error?.data?.error);
			});
	};
	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white">
			{(() => {
				if (isLoading) {
					return <SkeletonLoader />;
				}
				if (isError) {
					return warningMessage('There was an error ocurred!');
				}
				if (size(book))
					return (
						<div className="container px-5 py-24 mx-auto">
							<div className="lg:w-4/5 mx-auto flex flex-wrap">
								<img
									alt="book cover"
									className="lg:w-1/2 w-full object-contain object-center rounded border border-gray-200"
									src={book?.thumbnail || Cover}
								/>
								<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
									<h2 className="text-sm title-font text-gray-500 tracking-widest italic">
										By {book?.author}
									</h2>
									<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
										{book?.title}
									</h1>
									<div className="flex mb-4">
										<span className="flex items-center">
											<span className="text-gray-600 ml-3">
												{renderStars(book?.avgRating || 0)}(
												{book?.reviews?.length || 0}{' '}
												{book?.reviews?.length > 1 ? 'Reviews' : 'Review'})
											</span>
										</span>
										<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
											<div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-800 hidden md:block">
												Year: {book?.publishYear}
											</div>
										</span>
										<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
											<div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold text-rose-600 hidden md:block truncate">
												Publisher: {book?.publisher}
											</div>
										</span>
									</div>
									<p className="leading-relaxed">
										In a bustling city neighborhood, a group of close-knit
										friends embarks on a culinary adventure. They explore local
										flavors, create innovative recipes, and experiment with
										unique ingredients. Amidst the DIY spirit and creativity,
										they bond over delicious food and unforgettable experiences,
										savoring each moment with joy and passion.
									</p>
									<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
										<div className="flex items-center">
											<span className="mr-3">Genre: </span>
											<div className="relative">
												<div className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
													<span>{book?.genre}</span>
												</div>
											</div>
										</div>

										<div className="flex ml-6 items-center justify-center">
											<span className="mr-3 text-xs">Added By</span>
											{book?.user === user?.email ? (
												<button className="bg-slate-200 rounded-sm w-12 text-blue-400 align-middle focus:outline-none">
													you
												</button>
											) : (
												<button className="bg-slate-200 rounded-sm w-12 text-blue-400 align-middle focus:outline-none">
													{book?.user}
												</button>
											)}
										</div>
									</div>
									<div className="flex">
										<span className="title-font font-medium text-2xl text-red-500">
											৳{book?.price}
										</span>

										<button
											onClick={handleClick}
											disabled={book?.user !== user?.email}
											className={`flex ml-4 text-white ml-auto ${
												book?.user !== user?.email
													? 'bg-gray-400 cursor-not-allowed'
													: 'bg-red-500 hover:bg-red-600'
											} border-0 py-2 px-6 focus:outline-none rounded`}
										>
											Edit
										</button>
										{book?.user === user?.email && (
											<button
												disabled={deleteLoading}
												onClick={submitDelete}
												className="rounded-full w-10 h-10 bg-gray-200 hover:bg-slate-300 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4 cursor-pointer"
											>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										)}
										<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
											<svg
												fill="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
											</svg>
										</button>
									</div>
									<h1 className="text-slate-600 text-[1.02rem] leading-9 font-black my-4 text-start mb-10">
										What other people say about this book :
									</h1>
									{content}
									<CommentPost />
								</div>
							</div>
						</div>
					);
			})()}
		</section>
	);
}
