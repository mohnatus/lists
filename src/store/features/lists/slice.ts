import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getId } from '@/utils/get-id';
import { TList, TListData, TStatus } from '@/types';

import { addListThunk, getListsThunk } from './thunks';

export interface ListsState {
	status: TStatus;
	items: Array<TList>;
}

const initialState: ListsState = {
	status: 'idle',
	items: [],
};

export const listsSlice = createSlice({
	name: 'lists',
	initialState,
	reducers: {
		addListToStore(state, action: PayloadAction<TList>) {
			state.items.push(action.payload);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getListsThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getListsThunk.fulfilled, (state, action) => {
				console.log({ action })
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(addListThunk.fulfilled, (state, action) => {
				const itemIndex = state.items.findIndex(
					(item) => item.id === action.payload.id
				);

				if (itemIndex > -1) {
					state.items[itemIndex] = action.payload;
				} else {
					state.items.push(action.payload);
				}
			});
	},
});

export const getLists = () => {
	return (dispatch) => {
		dispatch(getListsThunk());
	};
};

export const addList = (data: TListData) => {
	const id = getId();

	return (dispatch) => {
		const listData = { ...data, id };
		dispatch(listsSlice.actions.addListToStore(listData));
		dispatch(addListThunk(listData));
	};
};

export const { reducer } = listsSlice;
