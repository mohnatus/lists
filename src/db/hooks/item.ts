import { useCallback } from 'react';

import { db } from '..';

export function useToggleItem() {
	const toggleItem = useCallback(
		async (itemId: number, isChecked: boolean) => {
			await db.items.update(itemId, { checked: isChecked });
		},
		[]
	);

	return toggleItem;
}
