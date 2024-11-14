import React from 'react';
import { arrayMove, List } from 'react-movable';

import { TList } from '@/db/types';
import { useSortLists } from '@/db/hooks';

type TListsSorterProps = {
	lists: TList[];
	onClose: () => void;
};

export const ListsSorter = ({ lists, onClose }: TListsSorterProps) => {
	const sortLists = useSortLists();

	const handleSort = async ({ oldIndex, newIndex }) => {
		try {
			const newSublists = arrayMove(lists, oldIndex, newIndex);
			await sortLists(newSublists.map((item) => item.id));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<button type='button' onClick={onClose}>
				Close
			</button>

			<List
				values={lists}
				onChange={handleSort}
				renderList={({ children, props }) => (
					<ul {...props}>{children}</ul>
				)}
				renderItem={({ value, props: { key, ...otherProps } }) => (
					<li key={key} {...otherProps}>
						<div>{value.name}</div>
					</li>
				)}
			/>
		</div>
	);
};
