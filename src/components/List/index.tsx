import React from 'react';

import type { TList } from '@/types';

type TListProps = {
	list: TList;
};

export const List = ({ list }: TListProps) => {
	return <div>{list.name}</div>;
};
