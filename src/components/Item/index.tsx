import React from 'react';

import type { TItem } from '@/types';

type TItemProps = {
	item: TItem;
};

export const Item = ({ item }: TItemProps) => {
	return <div>{item.name}</div>;
};
