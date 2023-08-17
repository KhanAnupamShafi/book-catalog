export type IBook = {
	_id: string;
	title: string;
	author: string;
	genre: string;
	price: number;
	publishYear: number;
	publisher: string;
	thumbnail: string;
	rating: number;
	user: string;
	createdAt: string;
	updatedAt: string;
};

export interface Review {
	id: string;
	user: string;
	comment: string;
	rating: number;
	createdAt: string;
	updatedAt: string;
}

export interface FormProps {
	initialBookInfo: IBook;
	// Add any other props your Form component might accept
	// For example: onSubmit: () => void;
}
