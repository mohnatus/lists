import React, { useEffect, useState } from 'react';

import { TListFormData } from '@/types';
import { TList } from '@/db/types';

type TListFormProps = {
	list?: TList;
	forSublist?: boolean;
	onSubmit: (data: TListFormData, id?: number) => void;
};

export const ListForm = ({ list, forSublist, onSubmit }: TListFormProps) => {
	const [name, setName] = useState('');
	const [color, setColor] = useState('#FF0000');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TListFormData = {
			name,
			color,
		};

		onSubmit(data, list?.id);
	};

	useEffect(() => {
		setName(list?.name || '');
		setColor(list?.color || '');
	}, [list]);

	return (
		<form onSubmit={handleSubmit}>
			<input
				name='name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			{!forSublist && (
				<input
					name='color'
					type='color'
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
			)}
		</form>
	);
};
