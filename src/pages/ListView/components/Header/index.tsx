import React, { useEffect, useRef, useState } from 'react';

import { TList } from '@/db/types';

import { Sidebar } from './Sidebar';
import * as s from './styles.module.scss';

type THeaderProps = {
	list: TList;
};

export const Header = ({ list }: THeaderProps) => {
	const listId = useRef(list.id);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		if (listId.current !== list.id) {
			setIsSidebarOpen(false);
		}
		listId.current = list.id;
	}, [list]);

	return (
		<>
			<header className={s.Header}>
				<button type='button' onClick={() => setIsSidebarOpen(true)}>
					Menu
				</button>
				<h1>List {list.name}</h1>
			</header>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
		</>
	);
};
