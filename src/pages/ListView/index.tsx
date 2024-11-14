import React, { act, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, arrayMove } from 'react-movable';

import { TItemFormData } from '@/types';
import {
	useAddItem,
	useAddSublist,
	useListData,
	useListItems,
	useListSublists,
	useSortItems,
	useSortLists,
	useToggleItem,
} from '@/db/hooks';
import { TListData } from '@/db/types';
import { Item } from '@/components/Item';
import { ItemForm } from '@/components/ItemForm';

import { ListForm } from '../../components/ListForm';

import { Header } from './components/Header';
import { Sublists } from './components/Sublists';
import { Items } from './components/Items';

export const ListView = () => {
	const params = useParams();
	const listId = Number(params.listId);

	const list = useListData(listId);

	const [activeSublistId, setActiveSublistId] = useState(0);

	if (list === undefined) {
		return <div>Loading...</div>;
	}

	if (!list) {
		return (
			<div>
				<h1>Такого списка не существует</h1>
				<Link to='/'>К спискам</Link>
			</div>
		);
	}

	return (
		<div>
			<Header list={list} />

			<Sublists
				activeId={activeSublistId}
				listId={listId}
				onSelect={setActiveSublistId}
			/>

			<Items listId={activeSublistId} />
		</div>
	);
};
