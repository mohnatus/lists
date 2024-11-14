import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, arrayMove } from 'react-movable';

import { TItemFormData } from '@/types';
import {
	useAddItem,
	useAddSublist,
	useListData,
	useListItems,
	useListSublists,
	useSortItems,
	useSortLists,
	useToggleItem,
} from '@/db/hooks';
import { TListData } from '@/db/types';
import { Item } from '@/pages/ListView/Item';
import { ItemForm } from '@/components/ItemForm';

import { ListForm } from '../../components/ListForm';
import { Sidebar } from './Sidebar';
import { SublistItem } from './SublistItem';

export const ListView = () => {
	const params = useParams();
	const listId = Number(params.listId);

	const addItem = useAddItem();
	const toggleItem = useToggleItem();
	const sortItems = useSortItems();
	const addSublist = useAddSublist();
	const sortLists = useSortLists();

	const list = useListData(listId);
	const sublists = useListSublists(listId);

	const [isAddItemFormOpen, setIsAddItemFormOpen] = useState(false);
	const [isAddSublistFormOpen, setIsAddSublistFormOpen] = useState(false);
	const [activeSublistId, setActiveSublistId] = useState(0);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const items = useListItems(activeSublistId);

	const openAddItemForm = () => {
		setIsAddItemFormOpen(true);
	};

	const openSublistForm = () => {
		setIsAddSublistFormOpen(true);
	};

	const handleAddItem = async (data: TItemFormData) => {
		try {
			const id = await addItem({
				...data,
				list: activeSublistId,
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

	const handleAddSublist = async (data: TListData) => {
		try {
			const id = await addSublist(data, listId);
			setIsAddSublistFormOpen(false);
		} catch (e) {
			console.error(e);
		}
	};

	const handleSortSublists = async ({ oldIndex, newIndex }) => {
		try {
			const newSublists = arrayMove(sublists, oldIndex, newIndex);
			await sortLists(newSublists.map((item) => item.id));
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (!sublists.length) {
			setActiveSublistId(0);
			return;
		}
		if (activeSublistId && sublists.some(list => list.id === activeSublistId)) {
			return;
		}

		setActiveSublistId(sublists[0]?.id);
	}, [sublists, activeSublistId]);

	if (list === undefined) {
		return <div>Loading...</div>;
	}

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
			<header>
				<button type='button' onClick={() => setIsSidebarOpen(true)}>
					Menu
				</button>
				<h1>List {list.name}</h1>
			</header>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			<div>
				<h2>Подсписки</h2>

				<div>
					<List
						values={sublists}
						onChange={handleSortSublists}
						renderList={({ children, props }) => (
							<ul {...props}>{children}</ul>
						)}
						renderItem={({
							value,
							props: { key, ...otherProps },
						}) => (
							<li key={key} {...otherProps}>
								<SublistItem
									isActive={activeSublistId === value.id}
									list={value}
									onClick={() => setActiveSublistId(value.id)}
								/>
							</li>
						)}
					/>
				</div>
			</div>

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
				<button type='button' onClick={openSublistForm}>
					Add sublist
				</button>
			</div>

			{isAddItemFormOpen && <ItemForm onSubmit={handleAddItem} />}
			{isAddSublistFormOpen && <ListForm onSubmit={handleAddSublist} />}
		</div>
	);
};
