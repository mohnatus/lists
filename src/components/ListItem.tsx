import React from 'react';
import { Link } from 'react-router-dom';

import { TList } from '@/db/types';
import { getListRoute } from '@/utils/getListRoute';

type TListProps = {
	list: TList;
};

export const ListItem = ({ list }: TListProps) => {
	return (
		<div>
			<Link to={getListRoute(list.id)}>{list.name}</Link>
		</div>
	);
};
