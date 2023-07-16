import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../rtk/api/apiSlice';
import userReducer from '../rtk/features/user/userSlice';

const store = configureStore({
	reducer: {
		// [apiSlice.reducerPath]: apiSlice.reducer,
		// user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
