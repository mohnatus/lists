import React, { useState } from 'react';

import { useActiveLists, useAddList } from '@/db/hooks';
import { TListFormData } from '@/types';
import { ListForm } from '@/components/ListForm';
import { List } from '@/components/List';

export const Lists = () => {
	const lists = useActiveLists();
	const addList = useAddList();
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

	return (
		<div>
			<div>
				{lists.map((list) => (
					<div key={list.id}>
						<List list={list} />
					</div>
				))}
			</div>

			<div>
				<button type='button' onClick={openAddListForm}>
					Add list
				</button>
			</div>

			{isAddListFormOpen && <ListForm onSubmit={handleAddList} />}
		</div>
	);
};
