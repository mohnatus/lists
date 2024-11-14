import React from 'react';

import { TList } from '@/db/types';

type TSublistItemProps = {
	isActive: boolean;
	list: TList;
	onClick: () => void;
};

export const SublistItem = ({ isActive, list, onClick }: TSublistItemProps) => {
	return (
		<div onClick={onClick}>
			{isActive && 'active'} {list.name}
		</div>
	);
};
