import { useCallback } from 'react';

import { db } from '..';
import { TItemData } from '../types';

export function useToggleItem() {
	const toggleItem = useCallback(
		async (itemId: number, isChecked: boolean) => {
			await db.items.update(itemId, { checked: isChecked });
		},
		[]
	);

	return toggleItem;
}

export function useEditItem() {
	const editItem = useCallback(async (id: number, listData: TItemData) => {
		await db.items.update(id, listData);
	}, [])

	return editItem
}
