import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { TItemData, TListData } from './types';

import { db } from '.';

export function useActiveLists() {
	const lists = useLiveQuery(() => db.lists.orderBy('order').toArray());
	return lists || [];
}

export function useListData(listId: number) {
	const list = useLiveQuery(() => db.lists.where({ id: listId }).first());
	return list;
}

export function useListItems(listId: number) {
	const items = useLiveQuery(() =>
		db.items.where('list').equals(listId).sortBy('order')
	);
	return items || [];
}

export function useAddList() {
	const addList = useCallback(async (listData: TListData) => {
		const lastList = await db.lists.orderBy('order').last();
		const id = await db.lists.add({
			...listData,
			order: lastList?.order + 1 || 0,
		});
		return id;
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
			list.order = order[list.id];
		});
	}, []);
	return sortLists;
}

export function useAddItem() {
	const addItem = useCallback(async (itemData: TItemData) => {
		const lastItem = (
			await db.items.where({ list: itemData.list }).sortBy('order')
		).pop();

		const id = await db.items.add({
			...itemData,
			checked: false,
			order: lastItem?.order || 0,
		});
		return id;
	}, []);

	return addItem;
}

export function useSortItems() {
	const sortItems = useCallback(async (ids: number[]) => {
		const order = {};
		ids.forEach((id, index) => {
			order[id] = index;
		});
    console.log({ order })
		await db.items.toCollection().modify((item) => {
			if (order[item.id] !== undefined) {
				item.order = order[item.id];
			}
		});
	}, []);
	return sortItems;
}

export function useToggleItem() {
	const toggleItem = useCallback(
		async (itemId: number, isChecked: boolean) => {
			await db.items.update(itemId, { checked: isChecked });
		},
		[]
	);

	return toggleItem;
}
