import React from 'react';

import { TItem } from '../../store/features/list';

type TItemProps = {
	item: TItem;
};

export const Item = ({ item }: TItemProps) => {
	return <div>{item.name}</div>;
};
