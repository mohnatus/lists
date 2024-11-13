import React, { useState } from 'react';

import type { TItemFormData } from '@/types';

type TItemFormProps = {
	onSubmit: (data: TItemFormData) => void;
};

export const ItemForm = ({ onSubmit }: TItemFormProps) => {
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TItemFormData = {
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
