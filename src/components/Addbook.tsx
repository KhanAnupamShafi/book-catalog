import { useAppSelector } from '@/app/hook';
import { toastAlert } from '@/helpers/AppHelper';
import { useAddSingleBookMutation } from '@/rtk/features/book/bookApi';
import { size } from 'lodash';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBook = () => {
	const { user } = useAppSelector((state) => state.user);

	const [addSingleBook, { isLoading, isError, error }] =
		useAddSingleBookMutation();
	const [mutationData, setMutationData] = useState({});
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null);
	const toastId = useRef(null);

	const handleChange = (name: string, value: string | number) => {
		setMutationData((prevData) => ({ ...prevData, [name]: value }));
	};

	const [year, setYear] = useState<Date | undefined>(undefined);
	const handleYearChange = (date: Date) => {
		setYear(date);
	};

	const handleAddBook = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		toast.dismiss(toastId.current!);
		let selectedYear;
		if (year) {
			selectedYear = year.getFullYear();
		}
		const updatedData = {
			...mutationData,
			publishYear: selectedYear,
			user: user?.email,
		};

		if (size(updatedData)) {
			addSingleBook(updatedData)
				.unwrap()
				.then((payload) => {
					if (size(payload)) {
						toastAlert('success', '📚Book📚 added successfully!');
						formRef.current?.reset();
						setMutationData({});
						navigate('/');
					}
				})
				.catch((error) =>
					toastAlert(
						'error',
						error?.error || 'Something went wrong! Please try again later.'
					)
				);
		}
	};

	return (
		<main className="py-6 2xl:px-6">
			<div className="container">
				<div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
					<h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
					<form ref={formRef} onSubmit={handleAddBook} className="book-form">
						<div className="space-y-2">
							<label htmlFor="lws-bookName">Book Name*</label>
							<input
								required
								className="text-input"
								type="text"
								id="lws-bookName"
								name="title"
								onChange={(e) => handleChange('title', e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="lws-author">Author*</label>
							<input
								required
								className="text-input"
								type="text"
								id="lws-author"
								name="author"
								onChange={(e) => handleChange('author', e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="lws-thumbnail">Image Url</label>
							<input
								className="text-input"
								type="url"
								id="lws-thumbnail"
								name="thumbnail"
								onChange={(e) => handleChange('thumbnail', e.target.value)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-8 pb-4">
							<div className="space-y-2">
								<label htmlFor="lws-genre">Genre*</label>
								<input
									required
									className="text-input"
									type="text"
									id="lws-genre"
									name="genre"
									onChange={(e) => handleChange('genre', e.target.value || '')}
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="lws-pub">Publisher</label>
								<input
									className="text-input"
									type="text"
									id="lws-pub"
									name="publisher"
									onChange={(e) =>
										handleChange('publisher', e.target.value || '')
									}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-8 h-24">
							<div className="space-y-2">
								<label htmlFor="lws-price">Price</label>
								<input
									className="text-input"
									type="number"
									id="lws-price"
									name="price"
									min="0"
									step="any"
									onChange={(e) =>
										handleChange('price', parseFloat(e.target.value) || 0)
									}
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="yearInput">Publication Year*</label>

								<DatePicker
									autoComplete="off"
									id="yearInput"
									className="text-input"
									selected={year}
									name="publicationDate"
									dateFormat="yyyy"
									showYearPicker
									placeholderText="Select the year"
									onChange={handleYearChange}
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="submit  bg-indigo-500"
							id="lws-submit"
						>
							{isLoading ? 'Applying...' : 'Add Book'}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

export default AddBook;
