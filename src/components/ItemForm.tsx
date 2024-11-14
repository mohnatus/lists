import React, { useEffect, useState } from 'react';

import type { TItemFormData } from '@/types';
import { TItem } from '@/db/types';

type TItemFormProps = {
	item?: TItem;
	onSubmit: (data: TItemFormData, id?: number) => void;
};

export const ItemForm = ({ item, onSubmit }: TItemFormProps) => {
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TItemFormData = {
			name,
		};

		onSubmit(data, item?.id);
	};

	useEffect(() => {
		setName(item?.name || '');
	}, [item]);

	return (
		<form onSubmit={handleSubmit}>
			<input
				name='name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</form>
	);
};
