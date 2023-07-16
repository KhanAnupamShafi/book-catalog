import Form from 'components/EditBook/Form';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import warningMessage from 'components/utils/warningMessage';
import { useGetBookQuery } from 'features/api/bookApi';
import { size } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';

const EditBook = () => {
	const { id } = useParams();
	const {
		data: BookInfo,
		isLoading: isBookLoading,
		isError,
	} = useGetBookQuery(id);

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
