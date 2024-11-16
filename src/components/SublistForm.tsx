import React, { useEffect, useState } from 'react';

import { TSublistFormData } from '@/types';
import { TList } from '@/db/types';

type TSublistFormProps = {
	list?: TList;
	onSubmit: (data: TSublistFormData, id?: number) => void;
};

export const SublistForm = ({ list, onSubmit }: TSublistFormProps) => {
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TSublistFormData = {
			name,
		};

		onSubmit(data, list?.id);
	};

	useEffect(() => {
		setName(list?.name || '');
	}, [list]);

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
