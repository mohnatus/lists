import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useListData } from '@/db/hooks';

import { Header } from './components/Header';
import { Sublists } from './components/Sublists';
import { Items } from './components/Items';
import { getContrastYIQ } from '@/utils/getContrastColor';

export const ListView = () => {
	const params = useParams();
	const listId = Number(params.listId);

	const list = useListData(listId);

	const [activeSublistId, setActiveSublistId] = useState(0);

	useEffect(() => {
		if (list?.color) {
			document.documentElement.style.setProperty(
				'--list-color',
				list.color
			);

			document.documentElement.style.setProperty(
				'--list-contrast',
				getContrastYIQ(list.color)
			);
		} else {
			document.documentElement.style.removeProperty('--list-color');
			document.documentElement.style.removeProperty('--list-contrast');
		}
	}, [list]);

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
