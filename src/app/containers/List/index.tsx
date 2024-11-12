import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { addItem, TItemData, selectList } from '../../store/features/list';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { Item } from '../../components/Item';
import { ItemForm } from '../../components/ItemForm';

export const List = () => {
  const dispatch = useAppDispatch()
	const list = useSelector(selectList);
	const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);

	const openAddItemForm = () => {
		setIsAddItemFormOpen(true);
	};

	const handleAddItem = (data: TItemData) => {
    setIsAddItemFormOpen(false)
		dispatch(addItem(data));
	};

	return (
		<div>
			<div>
				{list.map((item) => (
					<Item key={item.id} item={item} />
				))}
			</div>

			<div>
				<button type='button' onClick={openAddItemForm}>
					Add item
				</button>
			</div>

			{isAddItemFormOpen && <ItemForm onSubmit={handleAddItem} />}
		</div>
	);
};
