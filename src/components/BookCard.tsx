import { IBook } from '@/types/globalTypes';
import { Link, useNavigate } from 'react-router-dom';
import gif from '../assets/noCover.gif';
const BookCard = ({ book }: { book: Partial<IBook> }) => {
	const {
		_id,
		genre,
		publishYear,
		title,
		author,
		price,
		rating = 0,
		thumbnail,
	} = book || {};
	const navigate = useNavigate();
	return (
		<Link
			to={`/book-details/${_id}`}
			className="book-card border-r-2 border-b-2 border-t-1 border-stone-300"
		>
			<img
				className="h-[240px] w-[170px] object-cover "
				src={thumbnail || gif}
				alt="book"
			/>
			<div className="flex-1 h-full pr-2 pt-2 flex flex-col">
				<div className="flex items-center justify-end border-b border-[#dbdbdb] ">
					<div className="text-gray-500 space-x-2">
						<button
							type="button"
							className="lws-edit"
							onClick={() => {
								navigate(`/book-details/${_id}`);
							}}
						>
							<svg
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className="mt-1  ">
						<span className="text-sm italic px-3 py-1 rounded bg-slate-100">
							{genre}
						</span>
					</div>
					<div className="flex flex-row space-x-1">
						<div className="bg-[#c6f0d9] px-3 py-1 rounded flex items-center space-x-2 flex-row">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								fill="#4feb4c"
								viewBox="0 0 10 10"
							>
								<circle cx="5" cy="5" r="5" />
							</svg>
							<p className="text-xs font-bold"> {publishYear}</p>
						</div>
					</div>
				</div>

				<div className="space-y-2 mt-4 h-full">
					<h4 className="lws-book-name p-1 w-full">{title || ''}</h4>
					<p className="lws-author">{author || ''}</p>
					<div className="lws-stars">
						{[...Array(rating)]?.map((rating, i) => (
							<svg
								key={i + 1}
								viewBox="0 0 20 20"
								fill="currentColor"
								className="star"
							>
								<path
									fillRule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clipRule="evenodd"
								/>
							</svg>
						))}
					</div>

					<p className="lws-price">{`BDT ${price || 0}`}</p>
				</div>
			</div>
		</Link>
	);
};

export default BookCard;
