import React, { useState } from 'react';
import { List, arrayMove } from 'react-movable';

import { useActiveLists, useAddList, useSortLists } from '@/db/hooks';
import { TListFormData } from '@/types';
import { ListForm } from '@/components/ListForm';
import { ListItem } from '@/containers/Lists/ListItem';

export const Lists = () => {
	const addList = useAddList();
	const sortLists = useSortLists();

	const lists = useActiveLists();

	const [isAddListFormOpen, setIsAddListFormOpen] = useState(false);

	const openAddListForm = () => {
		setIsAddListFormOpen(true);
	};

	const handleAddList = async (data: TListFormData) => {
		try {
			const id = await addList(data);
			setIsAddListFormOpen(false);
		} catch (e) {
			console.error(e);
		}
	};

	const handleSort = ({ oldIndex, newIndex }) => {
		try {
			const newList = arrayMove(lists, oldIndex, newIndex);
			sortLists(newList.map((list) => list.id));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<List
				values={lists}
				onChange={handleSort}
				renderList={({ children, props }) => (
					<ul {...props}>{children}</ul>
				)}
				renderItem={({ value, props: { key, ...otherProps } }) => (
					<li key={key} {...otherProps}>
						<ListItem list={value} />
					</li>
				)}
			/>

			<div>
				<button type='button' onClick={openAddListForm}>
					Add list
				</button>
			</div>

			{isAddListFormOpen && <ListForm onSubmit={handleAddList} />}
		</div>
	);
};
