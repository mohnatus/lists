import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
	useAddItem,
	useListData,
	useListItems,
	useToggleItem,
} from '@/db/hooks';
import { TItemFormData } from '@/types';
import { Item } from '@/components/Item';
import { ItemForm } from '@/components/ItemForm';

export const List = () => {
	const params = useParams();
	const listId = Number(params.listId);

	const addItem = useAddItem();
	const toggleItem = useToggleItem();

	const list = useListData(listId);
	const items = useListItems(listId);

	const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);

	const openAddItemForm = () => {
		setIsAddItemFormOpen(true);
	};

	const handleAddItem = async (data: TItemFormData) => {
		try {
			const id = await addItem({
				...data,
				list: list.id,
			});
			setIsAddItemFormOpen(false);
		} catch (e) {
			console.error(e);
		}
	};

	const handleToggleItem = async (itemId: number, isChecked: boolean) => {
		try {
			await toggleItem(itemId, isChecked);
		} catch (e) {
			console.error(e);
		}
	};

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
			<h1>List {list.name}</h1>
			<div>
				{items.map((item) => (
					<div key={item.id}>
						<Item
							item={item}
							onToggle={(isChecked) =>
								handleToggleItem(item.id, isChecked)
							}
						/>
					</div>
				))}
			</div>

			<div>
				<button type='button' onClick={openAddItemForm}>
					Add item
				</button>
			</div>

			{isAddItemFormOpen && <ItemForm onSubmit={handleAddItem} />}

			<Link to='/'>К спискам</Link>
		</div>
	);
};
