import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface IFilter {
	searchQuery: string;
	selectedGenres: string[];
}
// initial state
const initialState: IFilter = {
	searchQuery: '',
	selectedGenres: [],
};

const bookSlice = createSlice({
	name: 'booksFilter',
	initialState,
	reducers: {
		toggleGenreOptions: (
			state,
			action: PayloadAction<{ value: string; checked: boolean }>
		) => {
			const { value, checked } = action.payload;
			if (checked) {
				state.selectedGenres.push(value);
			} else {
				state.selectedGenres = state.selectedGenres.filter(
					(option) => option !== value
				);
			}
		},
		removeGenreOption: (state, action: PayloadAction<string>) => {
			const valueToRemove = action.payload;
			state.selectedGenres = state.selectedGenres.filter(
				(option) => option !== valueToRemove
			);
		},
		searchFiltered: (state, action) => {
			state.searchQuery = action.payload?.toLowerCase() || '';
		},
		clearFilters: (state) => {
			state.selectedGenres = [];
			state.searchQuery = '';
		},
	},
});

export const {
	toggleGenreOptions,
	removeGenreOption,
	searchFiltered,
	clearFilters,
} = bookSlice.actions;
export default bookSlice.reducer;
