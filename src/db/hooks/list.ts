import { useCallback, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { TItemData, TListData, TSublistData } from '../types';

import { db } from '..';

export function useListData(listId: number) {
	const list = useLiveQuery(
		() => db.lists.where({ id: listId }).first(),
		[listId]
	);

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
	const list = useLiveQuery(
		() => db.lists.where({ id: listId }).first(),
		[listId]
	);

	const lists = useLiveQuery(
		() => db.lists.where('parent').equals(listId).sortBy('order'),
		[listId]
	);

	useEffect(() => {
		if (lists !== undefined && !lists?.length) {
			db.lists.add({
				name: 'Без названия',
				parent: listId,
				order: 0,
				isDefault: true,
				color: list.color,
			});
		}
	}, [list, lists]);

	return lists || [];
}

export function useAddSublist() {
	const addSublist = useCallback(
		async (listData: TSublistData, parent: number) => {
			const lastSublist = (
				await db.lists.where({ parent }).sortBy('order')
			).pop();

			const id = await db.lists.add({
				...listData,
				color: undefined,
				parent,
				order: lastSublist?.order + 1 || 0,
				isDefault: false,
			});
			return id;
		},
		[]
	);

	return addSublist;
}

export function useEditSublist() {
	const editList = useCallback(async (id: number, listData: TSublistData) => {
		await db.lists.update(id, listData);
	}, []);

	return editList;
}

export function useEditList() {
	const editList = useCallback(async (id: number, listData: TListData) => {
		await db.lists.update(id, listData);
		return id;
	}, []);

	return editList;
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
