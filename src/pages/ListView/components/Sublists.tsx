import React, { useEffect, useState } from 'react';
import { arrayMove, List } from 'react-movable';

import { useAddSublist, useListSublists, useSortLists } from '@/db/hooks';
import { SublistItem } from '@/components/SublistItem';
import { TListData } from '@/db/types';
import { ListForm } from '@/components/ListForm';

type TSublistsProps = {
	listId: number;
	activeId?: number;
	onSelect: (id: number) => void;
};

export const Sublists = ({ listId, activeId, onSelect }: TSublistsProps) => {
	const sortLists = useSortLists();
	const addSublist = useAddSublist();

	const sublists = useListSublists(listId);

	const [isAddSublistFormOpen, setIsAddSublistFormOpen] = useState(false);

	const handleSortSublists = async ({ oldIndex, newIndex }) => {
		try {
			const newSublists = arrayMove(sublists, oldIndex, newIndex);
			await sortLists(newSublists.map((item) => item.id));
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

	const openSublistForm = () => {
		setIsAddSublistFormOpen(true);
	};

	useEffect(() => {
		if (!sublists.length) {
			onSelect(0);
			return;
		}
		if (activeId && sublists.some((list) => list.id === activeId)) {
			return;
		}

		onSelect(sublists[0]?.id);
	}, [sublists, activeId]);

	return (
		<div>
			<h2>Подсписки</h2>

			<div>
				<List
					values={sublists}
					onChange={handleSortSublists}
					renderList={({ children, props }) => (
						<ul {...props}>{children}</ul>
					)}
					renderItem={({ value, props: { key, ...otherProps } }) => (
						<li key={key} {...otherProps}>
							<SublistItem
								isActive={activeId === value.id}
								list={value}
								onClick={() => onSelect(value.id)}
							/>
						</li>
					)}
				/>
			</div>

			<button type='button' onClick={openSublistForm}>
				Add sublist
			</button>

			{isAddSublistFormOpen && <ListForm onSubmit={handleAddSublist} />}
		</div>
	);
};
