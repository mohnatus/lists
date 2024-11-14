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
			<button type='button'>
				{isActive && 'active'} {list.name}
			</button>
		</div>
	);
};
