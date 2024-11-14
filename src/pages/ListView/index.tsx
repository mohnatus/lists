import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useListData } from '@/db/hooks';

import { Header } from './components/Header';
import { Sublists } from './components/Sublists';
import { Items } from './components/Items';

export const ListView = () => {
	const params = useParams();
	const listId = Number(params.listId);

	const list = useListData(listId);

	const [activeSublistId, setActiveSublistId] = useState(0);

	useEffect(() => {
		document.documentElement.style.setProperty('--theme', list?.color);
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
