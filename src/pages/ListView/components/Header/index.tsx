import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TListFormData } from '@/types';
import { TList } from '@/db/types';
import { useAddList, useEditList } from '@/db/hooks';
import { getListRoute } from '@/utils/getListRoute';
import { ListForm } from '@/components/ListForm';

import { Sidebar } from './Sidebar';
import * as s from './styles.module.scss';

type THeaderProps = {
	list: TList;
};

export const Header = ({ list }: THeaderProps) => {
	const navigate = useNavigate();
	const addList = useAddList();
	const editList = useEditList();

	const listId = useRef(list.id);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isListFormOpen, setIsListFormOpen] = useState(false);
	const [editedList, setEditedList] = useState(null);

	const openAddForm = () => {
		setEditedList(null);
		setIsListFormOpen(true);
	};

	const openEditForm = () => {
		setEditedList(list);
		setIsListFormOpen(true);
	};

	const handleSubmit = async (data: TListFormData, id?: number) => {
		try {
			setIsSidebarOpen(false);
			const currentListId = await (id
				? editList(id, data)
				: addList(data));
			setIsListFormOpen(false);
			setEditedList(null);

			console.log({ currentListId });

			if (currentListId !== listId.current) {
				navigate(getListRoute(currentListId));
			}
		} catch (e) {
			console.error(e);
		}
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
				<button type='button' onClick={openEditForm}>
					Edit
				</button>
			</header>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onAdd={openAddForm}
				onEdit={openEditForm}
			/>

			<ListForm
				isOpen={isListFormOpen}
				list={editedList}
				onSubmit={handleSubmit}
				onClose={() => setIsListFormOpen(false)}
			/>
		</>
	);
};
