import React, { useEffect, useState } from 'react';

import { useAddSublist, useListSublists } from '@/db/hooks';
import { TListData } from '@/db/types';
import { ListForm } from '@/components/ListForm';
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

	const sublists = useListSublists(listId);

	const [isAddSublistFormOpen, setIsAddSublistFormOpen] = useState(false);
	const [isSorterOpen, setIsSorterOpen] = useState(false);

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
								onClick={() => onSelect(list.id)}
							/>
						</div>
					))}
				</div>
			</div>

			<button type='button' onClick={openSublistForm}>
				Add sublist
			</button>

			{isAddSublistFormOpen && <ListForm onSubmit={handleAddSublist} />}
		</div>
	);
};
