import React from 'react';
import { Link } from 'react-router-dom';

import { TList } from '@/db/types';

type TListProps = {
	list: TList;
	onEdit: () => void;
};

export const ListItem = ({ list, onEdit }: TListProps) => {
	return (
		<div>
			<Link to={`/list/${list.id}`}>{list.name}</Link>
			
			<button type='button' onClick={onEdit}>
				Edit
			</button>
		</div>
	);
};
