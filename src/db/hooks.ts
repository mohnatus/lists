import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { TItemData, TListData } from './types';

import { db } from '.';

export function useActiveLists() {
	const lists = useLiveQuery(() => db.lists.toArray());
	return lists || [];
}

export function useListData(listId: number) {
	const list = useLiveQuery(() => db.lists.where({ id: listId }).first());
	return list;
}

export function useListItems(listId: number) {
	const items = useLiveQuery(() =>
		db.items.where('list').equals(listId).toArray()
	);
	return items || [];
}

export function useAddList() {
	const addList = useCallback(async (listData: TListData) => {
		const id = await db.lists.add(listData);
		return id;
	}, []);

	return addList;
}

export function useAddItem() {
	const addItem = useCallback(async (itemData: TItemData) => {
		const id = await db.items.add({
			...itemData,
			checked: false,
		});
    return id
	}, []);

	return addItem;
}

export function useToggleItem() {
  const toggleItem = useCallback(async (itemId: number, isChecked: boolean) => {
    await db.items.update(itemId, { checked: isChecked });
  }, [])

  return toggleItem
}
