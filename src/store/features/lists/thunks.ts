import { createAsyncThunk } from '@reduxjs/toolkit';

import { TList } from '@/types';
import { getListsFromDb, addListToDb } from '@/db/lists';

export const getListsThunk = createAsyncThunk('lists/get', async () => {
	const lists = await getListsFromDb();
	return lists;
});

export const addListThunk = createAsyncThunk(
	'lists/add',
	async (data: TList) => {
		await addListToDb(data);
		return data;
	}
);
