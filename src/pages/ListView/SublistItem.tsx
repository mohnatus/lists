import React from 'react';

import { TList } from '@/db/types';

type TSublistItemProps = {
	isActive: boolean;
	list: TList;
	onClick: () => void;
};

export const SublistItem = ({ isActive, list, onClick }: TSublistItemProps) => {
	return (
		<div style={{ padding: '20px' }} onClick={onClick}>
			<button type='button'>
				{isActive && 'active'} {list.name}
			</button>
		</div>
	);
};
