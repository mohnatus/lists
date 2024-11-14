import React, { useEffect, useRef, useState } from 'react';

import { TList, TListData } from '@/db/types';

import { Sidebar } from './Sidebar';
import * as s from './styles.module.scss';
import { ListForm } from '@/components/ListForm';
import { useEditList } from '@/db/hooks';

type THeaderProps = {
	list: TList;
};

export const Header = ({ list }: THeaderProps) => {
	const editList = useEditList();

	const listId = useRef(list.id);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleSubmit = (data: TListData) => {
		editList(list.id, data);
		setIsFormOpen(false)
	};

	useEffect(() => {
		if (listId.current !== list.id) {
			setIsSidebarOpen(false);
		}
		listId.current = list.id;
	}, [list]);

	return (
		<>
			<header className={s.Header}>
				<button type='button' onClick={() => setIsSidebarOpen(true)}>
					Menu
				</button>
				<h1>List {list.name}</h1>
				<button type='button' onClick={() => setIsFormOpen(true)}>Edit</button>
			</header>

			{isFormOpen && <ListForm list={list} onSubmit={handleSubmit} />}

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
		</>
	);
};
