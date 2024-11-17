import React, { useState } from 'react';

import { useActiveLists } from '@/db/hooks';
import { ListsSorter } from '@/components/ListsSorter/ListsSorter';
import { ListItem } from '@/components/ListItem';

import * as s from './styles.module.scss';

type TSidebarProps = {
	isOpen: boolean;
	onClose: () => void;
	onAdd: () => void;
	onEdit: () => void;
};

export const Sidebar = ({ isOpen, onClose, onAdd, onEdit }: TSidebarProps) => {
	const lists = useActiveLists();

	const [isSorterOpen, setIsSorterOpen] = useState(false);

	return (
		<aside className={[s.Sidebar, isOpen ? s.Open : ''].join(' ')}>
			<div>
				<button type='button' onClick={onClose}>
					Close
				</button>
			</div>

			<div>
				<button type='button' onClick={() => setIsSorterOpen(true)}>
					Resort 
				</button>
			</div>

			<div>
				<button type='button' onClick={onAdd}>
					Add list
				</button>
			</div>

			<div>
				<button type='button' onClick={onEdit}>
					Edit current list
				</button>
			</div>

			{isSorterOpen && (
				<ListsSorter
					lists={lists}
					onClose={() => setIsSorterOpen(false)}
				/>
			)}

			{lists.map((list) => (
				<div key={list.id}>
					<ListItem list={list} />
				</div>
			))}
		</aside>
	);
};
