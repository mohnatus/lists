import React, { useEffect, useState } from 'react';

import { useAddSublist,  useEditSublist, useListSublists } from '@/db/hooks';
import { TList, TSublistData } from '@/db/types';
import { SublistForm } from '@/components/SublistForm';
import { ListsSorter } from '@/components/ListsSorter/ListsSorter';

import { Item } from './Item';
import * as s from './styles.module.scss';

type TSublistsProps = {
	listId: number;
	activeId?: number;
	onSelect: (id: number) => void;
};

export const Sublists = ({ listId, activeId, onSelect }: TSublistsProps) => {
	const addSublist = useAddSublist();
	const editSublist = useEditSublist();

	const sublists = useListSublists(listId);

	const [isSublistFormOpen, setIsSublistFormOpen] = useState(false);
	const [editedSublist, setEditedSublist] = useState(null);
	const [isSorterOpen, setIsSorterOpen] = useState(false);

	const handleSubmit = async (data: TSublistData, id?: number) => {
		try {
			await (id ? editSublist(id, data) : addSublist(data, listId));
			setIsSublistFormOpen(false);
		} catch (e) {
			console.error(e);
		}
	};

	const openAddSublistForm = () => {
		setEditedSublist(null);
		setIsSublistFormOpen(true);
	};

	const openEditSublistForm = (list: TList) => {
		setEditedSublist(list);
		setIsSublistFormOpen(true);
	};

	const handleClick = (list: TList) => {
		if (list.id === activeId) {
			openEditSublistForm(list);
		} else {
			onSelect(list.id);
		}
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
			<h2>
				Подсписки{' '}
				<button type='button' onClick={() => setIsSorterOpen(true)}>
					Сортировать
				</button>
			</h2>

			{isSorterOpen && (
				<ListsSorter
					lists={sublists}
					onClose={() => setIsSorterOpen(false)}
				/>
			)}

			<div>
				<div className={s.List}>
					{sublists.map((list) => (
						<div className={s.Item} key={list.id}>
							<Item
								isActive={activeId === list.id}
								list={list}
								onClick={() => handleClick(list)}
							/>
						</div>
					))}
				</div>
			</div>

			<button type='button' onClick={openAddSublistForm}>
				Add sublist
			</button>

			{isSublistFormOpen && (
				<SublistForm list={editedSublist} onSubmit={handleSubmit} />
			)}
		</div>
	);
};
