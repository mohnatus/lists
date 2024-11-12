import React, { useState } from 'react';

import type { TListData } from '@/types';

type TListFormProps = {
	onSubmit: (data: TListData) => void;
};

export const ListForm = ({ onSubmit }: TListFormProps) => {
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TListData = {
			name,
		};
		onSubmit(data);
	};

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
