import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { TListData } from '@/types';
import { addList, getLists, selectLists } from '@/store/features/lists';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { ListForm } from '@/components/ListForm';
import { List } from '@/components/List';

export const Lists = () => {
	const dispatch = useAppDispatch();
	const lists = useSelector(selectLists);
	const [isAddListFormOpen, setIsAddListFormOpen] = useState(false);

	const openAddListForm = () => {
		setIsAddListFormOpen(true);
	};

	const handleAddList = (data: TListData) => {
		setIsAddListFormOpen(false);
		dispatch(addList(data));
	};

	useEffect(() => {
		dispatch(getLists());
	}, [dispatch]);

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
