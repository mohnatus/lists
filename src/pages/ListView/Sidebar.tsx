import React from 'react';

import { Lists } from '@/containers/Lists';

type TSidebarProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: TSidebarProps) => {
	if (!isOpen) return null;

	return (
		<aside>
			<button type='button' onClick={onClose}>
				Close
			</button>
			
			<Lists />
		</aside>
	);
};
