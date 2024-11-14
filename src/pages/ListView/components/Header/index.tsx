import React, { useState } from 'react';

import { TList } from '@/db/types';

import { Sidebar } from './Sidebar';

type THeaderProps = {
	list: TList;
};

export const Header = ({ list }: THeaderProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<>
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
		</>
	);
};
