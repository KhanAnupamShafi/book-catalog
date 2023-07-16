import { auth } from '@/lib/firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const initialState = {
	user: {
		email: null as string | null,
	},
	isLoading: false,
	isError: false,
	error: null as string | null,
};

interface IUserCredential {
	email: string;
	password: string;
}

// create async thunk
export const registerUser = createAsyncThunk(
	'user',
	async ({ email, password }: IUserCredential) => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		console.log('hello', userCredential);

		return userCredential.user.email;
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<string | null>) => {
			state.user.email = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user.email = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error.message || null;
			});
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
