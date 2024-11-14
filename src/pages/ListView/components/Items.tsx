import React, { useState } from 'react';
import { arrayMove, List } from 'react-movable';

import { TItemFormData } from '@/types';
import {
	useAddItem,
	useListItems,
	useSortItems,
	useToggleItem,
} from '@/db/hooks';
import { Item } from '@/components/Item';
import { ItemForm } from '@/components/ItemForm';

type TItemsProps = {
	listId: number;
};

export const Items = ({ listId }: TItemsProps) => {
	const addItem = useAddItem();
	const toggleItem = useToggleItem();
	const sortItems = useSortItems();

	const items = useListItems(listId);

	const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);

	const openAddItemForm = () => {
		setIsAddItemFormOpen(true);
	};

	const handleAddItem = async (data: TItemFormData) => {
		try {
			const id = await addItem({
				...data,
				list: listId,
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

	const handleSortItems = async ({ oldIndex, newIndex }) => {
		try {
			const newItems = arrayMove(items, oldIndex, newIndex);
			await sortItems(newItems.map((item) => item.id));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<div>Элементы</div>

			<List
				values={items}
				onChange={handleSortItems}
				renderList={({ children, props }) => (
					<ul {...props}>{children}</ul>
				)}
				renderItem={({ value, props: { key, ...otherProps } }) => (
					<li key={value.id} {...otherProps}>
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
		</>
	);
};
