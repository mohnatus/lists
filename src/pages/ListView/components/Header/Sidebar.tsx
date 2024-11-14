import React, { useState } from 'react';

import { TListFormData } from '@/types';
import { useActiveLists, useAddList } from '@/db/hooks';
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

	const [isSorterOpen, setIsSorterOpen] = useState(false);
	const [isAddListFormOpen, setIsAddListFormOpen] = useState(false);

	const openAddListForm = () => {
		setIsAddListFormOpen(true);
	};

	const handleAddList = async (data: TListFormData) => {
		try {
			await addList(data);
			setIsAddListFormOpen(false);
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
					<ListItem list={list} />
				</div>
			))}

			<div>
				<button type='button' onClick={openAddListForm}>
					Add list
				</button>
			</div>

			{isAddListFormOpen && <ListForm onSubmit={handleAddList} />}
		</aside>
	);
};
