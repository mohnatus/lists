import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { TListData } from '../types';

import { db } from '..';

export function useActiveLists() {
	const lists = useLiveQuery(() =>
		db.lists.where({ parent: 0 }).sortBy('order')
	);

	return lists || [];
}

export function useAddList() {
	const addList = useCallback(async (listData: TListData) => {
		let lastList = await db.lists.orderBy('order').last();

		const listId = await db.lists.add({
			...listData,
			order: lastList?.order + 1 || 0,
			parent: 0,
			isDefault: false,
		});

		await db.lists.add({
			name: 'Без названия',
			order: 0,
			parent: listId,
			isDefault: true,
			color: undefined,
		});

		return listId;
	}, []);

	return addList;
}

export function useSortLists() {
	const sortLists = useCallback(async (ids: number[]) => {
		const order = {};

		ids.forEach((id, index) => {
			order[id] = index;
		});

		await db.lists.toCollection().modify((list) => {
			if (order[list.id] !== undefined) {
				list.order = order[list.id];
			}
		});
	}, []);
	return sortLists;
}
