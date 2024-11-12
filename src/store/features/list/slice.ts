import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TItem, TItemData } from '@/types';
import { getId } from '@/utils/get-id';

export interface ListState {
	items: Array<TItem>;
}

const initialState: ListState = {
	items: [{ id: '1', name: 'item1' }],
};

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		addItemToList: (state, action: PayloadAction<TItem>) => {
			state.items.push(action.payload);
		},
		removeItemFromList: (state) => {},
	},
});

const { addItemToList, removeItemFromList } = listSlice.actions;

export const addItem = (data: TItemData) => {
	return (dispatch) => {
		const id = getId();

		dispatch(
			addItemToList({
				...data,
				id,
			})
		);
	};
};

export const removeItem = async (id: string) => {};

export const { reducer } = listSlice;
