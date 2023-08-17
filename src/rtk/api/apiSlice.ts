import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		// baseUrl: 'https://library-catalog.vercel.app/',
		baseUrl: 'https://library-catalog.vercel.app/',
	}),
	endpoints: () => ({}),
});
