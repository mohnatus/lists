import React from 'react';
import { Link } from 'react-router-dom';

import { TList } from '@/db/types';

type TListProps = {
	list: TList;
};

export const ListItem = ({ list }: TListProps) => {
	return <Link to={`/list/${list.id}`}>{list.name}</Link>;
};
