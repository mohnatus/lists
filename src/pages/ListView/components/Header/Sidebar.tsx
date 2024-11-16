import React, { useState } from 'react';

import { TListFormData } from '@/types';
import { TList } from '@/db/types';
import { useActiveLists, useAddList, useEditList } from '@/db/hooks';
import { ListsSorter } from '@/components/ListsSorter/ListsSorter';
import { ListItem } from '@/components/ListItem';
import { ListForm } from '@/components/ListForm';

import * as s from './styles.module.scss';

type TSidebarProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: TSidebarProps) => {
	const lists = useActiveLists();

	const addList = useAddList();
	const editList = useEditList();

	const [isSorterOpen, setIsSorterOpen] = useState(false);
	const [isListFormOpen, setIsListFormOpen] = useState(false);
	const [editedList, setEditedList] = useState(null);

	const openAddListForm = () => {
		setEditedList(null);
		setIsListFormOpen(true);
	};

	const openEditListForm = (list: TList) => {
		setEditedList(list);
		setIsListFormOpen(true);
	};

	const handleSubmit = async (data: TListFormData, id?: number) => {
		try {
			(await id) ? editList(id, data) : addList(data);
			setIsListFormOpen(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<aside className={[s.Sidebar, isOpen ? s.Open : ''].join(' ')}>
			<button type='button' onClick={onClose}>
				Close
			</button>

			<button type='button' onClick={() => setIsSorterOpen(true)}>
				Resort
			</button>

			{isSorterOpen && (
				<ListsSorter
					lists={lists}
					onClose={() => setIsSorterOpen(false)}
				/>
			)}

			{lists.map((list) => (
				<div key={list.id}>
					<ListItem
						list={list}
						onEdit={() => openEditListForm(list)}
					/>
				</div>
			))}

			<div>
				<button type='button' onClick={openAddListForm}>
					Add list
				</button>
			</div>

			{isListFormOpen && (
				<ListForm list={editedList} onSubmit={handleSubmit} />
			)}
		</aside>
	);
};
