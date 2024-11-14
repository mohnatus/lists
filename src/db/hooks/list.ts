import { useCallback, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { TItemData, TListData } from '../types';

import { db } from '..';

export function useListData(listId: number) {
	const list = useLiveQuery(() => db.lists.where({ id: listId }).first());

	return list;
}

export function useListItems(listId: number) {
	const items = useLiveQuery(
		() => db.items.where('list').equals(listId).sortBy('order'),
		[listId]
	);

	return items || [];
}

export function useListSublists(listId: number) {
	const lists = useLiveQuery(() =>
		db.lists.where('parent').equals(listId).sortBy('order')
	);

	useEffect(() => {
		if (lists !== undefined && !lists?.length) {
			db.lists.add({
				name: 'Без названия',
				parent: listId,
				order: 0,
				isDefault: true,
			});
		}
	}, [lists]);

	return lists || [];
}

export function useAddSublist() {
	const addSublist = useCallback(
		async (listData: TListData, parent: number) => {
			const lastList = (
				await db.lists.where({ parent }).sortBy('order')
			).pop();

			const id = await db.lists.add({
				...listData,
				parent,
				order: lastList?.order + 1 || 0,
				isDefault: false,
			});
			return id;
		},
		[]
	);

	return addSublist;
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

		await db.items.toCollection().modify((item) => {
			if (order[item.id] !== undefined) {
				item.order = order[item.id];
			}
		});
	}, []);
	return sortItems;
}
