import { warningMessage } from '@/helpers/Warning';
import { useGetABookQuery } from '@/rtk/features/book/bookApi';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { size } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

const EditBook = () => {
	const { id } = useParams();
	const {
		data: BookInfo,
		isLoading: isBookLoading,
		isError,
	} = useGetABookQuery({ id });

	return (
		<>
			{(() => {
				if (isBookLoading) {
					return <LoadingSpinner customClass="height-450" />;
				}
				if (isError) {
					return warningMessage('There was an error ocurred!');
				}
				if (size(BookInfo)) {
					return <Form initialBookInfo={BookInfo} />;
				}
				return '';
			})()}
		</>
	);
};

export default EditBook;
