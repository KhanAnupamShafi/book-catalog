import { apiSlice } from '@/rtk/api/apiSlice';

const bookApi = apiSlice
	.enhanceEndpoints({ addTagTypes: ['Books'] })
	.injectEndpoints({
		endpoints: (builder) => ({
			addSingleBook: builder.mutation({
				query: (data) => ({
					url: '/book',
					method: 'POST',
					body: data,
				}),
				invalidatesTags: ['Books'],
			}),
			updateBook: builder.mutation({
				query: ({ id, data }) => ({
					url: `/book/${id}`,
					method: 'PATCH',
					body: data,
				}),
				invalidatesTags: ['Books'],
			}),
			getAllBooks: builder.query({
				query: (filterOptions) => ({
					url: '/books',
					method: 'GET',
					params: filterOptions,
				}),
				providesTags: ['Books'],
			}),
			getLatestBooks: builder.query({
				query: (filterOptions) => ({
					url: '/latest',
					method: 'GET',
					params: filterOptions,
				}),
				providesTags: ['Books'],
			}),
			getABook: builder.query({
				query: ({ id }) => ({
					url: `/book/${id}`,
					method: 'GET',
				}),
				providesTags: ['Books'],
			}),
			deleteBook: builder.mutation({
				query: ({ id }) => ({
					url: `/book/${id}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['Books'],
			}),
			getAllGenres: builder.query({
				query: () => ({
					url: '/genres',
					method: 'GET',
				}),
				providesTags: ['Books'],
			}),
			getRating: builder.query({
				query: ({ id }) => ({
					url: `/book/averageRating/${id}`,
					method: 'GET',
				}),
				providesTags: ['Books'],
			}),
			getReviews: builder.query({
				query: ({ id }) => ({
					url: `/book/comments/${id}`,
					method: 'GET',
				}),
				providesTags: ['Books'],
			}),
			postReview: builder.mutation({
				query: (data) => ({
					url: '/book/comment',
					method: 'POST',
					body: data,
				}),
				invalidatesTags: ['Books'],
			}),
		}),
	});

export const {
	useAddSingleBookMutation,
	useUpdateBookMutation,
	useGetAllBooksQuery,
	useGetAllGenresQuery,
	useGetABookQuery,
	usePostReviewMutation,
	useGetReviewsQuery,
	useDeleteBookMutation,
	useGetRatingQuery,
	useGetLatestBooksQuery,
} = bookApi;

// endpoints: (builder) => ({
// 	getBooks: builder.query({
// 		query: () => '/books',
// 		providesTags: ['Books'],
// 	}),
// 	getBook: builder.query({
// 		query: (id) => `/books/${id}`,
// 		providesTags: (result, error, arg) => [{ type: 'Book', id: arg }],
// 	}),
// 	addBook: builder.mutation({
// 		query: (data) => ({
// 			url: '/books',
// 			method: 'POST',
// 			body: data,
// 		}),
// 		invalidatesTags: ['Books'],
// 	}),
// 	updateBook: builder.mutation({
// 		query: ({ id, data }) => ({
// 			url: `/books/${id}`,
// 			method: 'PATCH',
// 			body: data,
// 		}),
// 		invalidatesTags: (result, error, arg) => [
// 			'Books',
// 			{ type: 'Book', id: arg?.id },
// 		],
// 	}),
// 	deleteBook: builder.mutation({
// 		query: (id) => ({
// 			url: `/books/${id}`,
// 			method: 'DELETE',
// 		}),
// 		invalidatesTags: ['Books'],
// 	}),
// }),
