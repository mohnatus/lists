import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, arrayMove } from 'react-movable';

import {
	useAddItem,
	useListData,
	useListItems,
	useSortItems,
	useToggleItem,
} from '@/db/hooks';
import { TItemFormData } from '@/types';
import { Item } from '@/containers/ListView/Item';
import { ItemForm } from '@/containers/ListView/ItemForm';

export const ListView = () => {
	const params = useParams();
	const listId = Number(params.listId);

	const addItem = useAddItem();
	const toggleItem = useToggleItem();
	const sortItems = useSortItems();

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

	const handleSort = ({ oldIndex, newIndex }) => {
		try {
			const newItems = arrayMove(items, oldIndex, newIndex);
			sortItems(newItems.map((item) => item.id));
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

			<List
				values={items}
				onChange={handleSort}
				renderList={({ children, props }) => (
					<ul {...props}>{children}</ul>
				)}
				renderItem={({ value, props: { key, ...otherProps } }) => (
					<li key={key} {...otherProps}>
						<Item
							item={value}
							onToggle={(isChecked) =>
								handleToggleItem(value.id, isChecked)
							}
						/>
					</li>
				)}
			/>

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
