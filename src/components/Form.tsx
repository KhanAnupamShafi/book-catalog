import { toastAlert } from '@/helpers/AppHelper';
import { useUpdateBookMutation } from '@/rtk/features/book/bookApi';
import { FormProps } from '@/types/globalTypes';
import { size } from 'lodash';
import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Form: React.FC<FormProps> = ({ initialBookInfo }) => {
	const { id } = useParams();
	const [updateBook, { isLoading }] = useUpdateBookMutation();
	const [mutationData, setMutationData] = useState(initialBookInfo);
	const navigate = useNavigate();
	const formRef = useRef(null);
	const toastId = useRef(null);

	useEffect(() => {
		// Set the initial value of the datepicker from the fetched data (initialBookInfo)
		if (initialBookInfo && initialBookInfo.publishYear) {
			setMutationData((prevData) => ({
				...prevData,
				publishYear: initialBookInfo.publishYear,
			}));
		}
	}, [initialBookInfo]);
	// Helper function to convert a year string to a valid Date object
	const getDateFromYear = (year: number): Date => {
		// const parsedYear = parseInt(year, 10);
		return new Date(year, 0, 1);
	};
	const handleYearChange = (date: Date) => {
		// Extract the year from the selected date and update mutationData
		const year = date.getFullYear();
		setMutationData((prevData) => ({ ...prevData, publishYear: year }));
	};
	const handleChange = (name: string, value: string | number) => {
		setMutationData((prevData) => ({ ...prevData, [name]: value }));
	};
	const handleUpdateBook = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		toast.dismiss(toastId.current!);
		const updatedData = { ...mutationData };
		console.log(updatedData);
		if (size(updatedData)) {
			updateBook({ id, data: updatedData })
				.unwrap()
				.then((payload) => {
					if (size(payload)) {
						toastAlert('success', 'Updated successfully!');

						navigate(`/book-details/${id}`);
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
					<h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
					<form ref={formRef} onSubmit={handleUpdateBook} className="book-form">
						<div className="space-y-2">
							<label htmlFor="lws-bookName">Book Name*</label>
							<input
								required
								className="text-input"
								type="text"
								id="lws-bookName"
								name="name"
								defaultValue={mutationData?.title}
								onChange={(e) => handleChange('name', e.target.value)}
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
								defaultValue={mutationData?.author}
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
								defaultValue={mutationData?.thumbnail}
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
									defaultValue={mutationData?.genre}
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
									defaultValue={mutationData?.publisher}
									onChange={(e) =>
										handleChange('publisher', e.target.value || '')
									}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-8 pb-4">
							<div className="space-y-2">
								<label htmlFor="lws-price">Price</label>
								<input
									className="text-input"
									type="number"
									id="lws-price"
									name="price"
									min="0"
									step="any"
									defaultValue={mutationData?.price}
									onChange={(e) =>
										handleChange('price', parseFloat(e.target.value) || 0)
									}
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="yearInput">Publication Year*</label>

								<ReactDatePicker
									autoComplete="off"
									id="yearInput"
									className="text-input"
									selected={getDateFromYear(mutationData.publishYear)} // Convert the publishYear string to a Date object
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
							className="submit bg-indigo-400 hover:bg-indigo-500"
							id="lws-submit"
						>
							{isLoading ? 'Updating...' : 'Edit Book'}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
};

export default Form;
