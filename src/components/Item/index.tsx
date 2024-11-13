import React from 'react';

import type { TItem } from '@/db/types';

type TItemProps = {
	item: TItem;
	onToggle: (isChecked: boolean) => void;
};

export const Item = ({ item, onToggle }: TItemProps) => {
	return (
		<div>
			<input
				type='checkbox'
				checked={item.checked}
				onChange={(e) => onToggle(e.target.checked)}
			/>
			
			{item.name}
		</div>
	);
};
