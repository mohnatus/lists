import React, { useState } from 'react';

import { TListFormData } from '@/types';

type TListFormProps = {
	onSubmit: (data: TListFormData) => void;
};

export const ListForm = ({ onSubmit }: TListFormProps) => {
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TListFormData = {
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
