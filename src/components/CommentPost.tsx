import { useAppSelector } from '@/app/hook';
import { toastAlert } from '@/helpers/AppHelper';
import { usePostReviewMutation } from '@/rtk/features/book/bookApi';
import Rate from '@/shared/Rate';
import { size } from 'lodash';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CommentPost() {
	const { id } = useParams();
	const toastId = useRef(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [textareaValue, setTextareaValue] = useState('');
	const { user } = useAppSelector((state) => state.user);

	const [postReview, { data, isLoading, isError, error }] =
		usePostReviewMutation();

	const [rating, setRating] = useState(3);
	const handleTextareaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setTextareaValue(event.target?.value);
	};
	const navigate = useNavigate();
	const handleSubmit = () => {
		toast.dismiss(toastId.current!);
		if (!user?.email) {
			navigate('/login');
		}
		postReview({
			bookId: id,
			user: user?.email,
			rating,
			comment: textareaValue,
		})
			.unwrap()
			.then((payload) => {
				if (size(payload)) {
					toastAlert('success', 'Review added successfully');
					formRef.current?.reset();
					setTextareaValue('');
				}
				console.log('Review added successfully:', payload);
			})
			.catch((error) => {
				// Handle error
				toastAlert('error', error?.data?.error);
			});
	};

	const isSubmitDisabled =
		textareaValue.length === 0 || textareaValue.length > 200;

	return (
		<form ref={formRef} className="bg-white text-zinc-400 rounded-2xl mx-auto">
			<p className="font-semibold mb-2 text-start">
				How was your experience reading this book?
			</p>
			<span className="text-[0.90rem] leading-5 font-semibold mb-3">
				Comment :{' '}
			</span>
			<div className="">
				<div className="mt-1">
					<label>
						<textarea
							onChange={handleTextareaChange}
							className={`h-24 w-full bg-gray-200 text-black cursor-text break-words p-4 overflow-auto `}
						></textarea>
					</label>
				</div>
				<div className="gap-0 flex justify-center">
					<Rate rating={rating} onRating={(rate) => setRating(rate)} />
					<p>({rating})</p>
				</div>
			</div>

			<div className="flex flex-col mt-4">
				<input
					disabled={isSubmitDisabled}
					onClick={handleSubmit}
					value={isLoading ? 'In Progress...' : 'Submit'}
					type="button"
					className={`h-14 items-start transition-colors duration-500 text-white cursor-pointer font-bold py-4 px-8 text-center border-2 border-solid rounded-xl ${
						isSubmitDisabled
							? 'bg-slate-200 cursor-not-allowed'
							: 'bg-slate-600 hover:bg-gray-600'
					}`}
				/>
				<input
					value="Cancel"
					type="reset"
					className="h-11 items-start text-black cursor-pointer text-[0.90rem] leading-5 font-semibold opacity-80 py-3.5 px-7 text-center"
				/>
			</div>
		</form>
	);
}
