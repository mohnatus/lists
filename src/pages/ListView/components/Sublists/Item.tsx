import React from 'react';

import { TList } from '@/db/types';

type TItemProps = {
	isActive: boolean;
	list: TList;
	onClick: () => void;
};

export const Item = ({ isActive, list, onClick }: TItemProps) => {
	return (
		<div style={{ padding: '20px' }} onClick={onClick}>
			<span>
				{isActive && 'active'} {list.name}
			</span>

			<div data-movable-handle>handle</div>
		</div>
	);
};
