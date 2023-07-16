import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {
		email: '',
	},
	isLoading: false,
	isError: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			state.user.email = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
