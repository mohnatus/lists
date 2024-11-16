import React, { useEffect, useState } from 'react';

import { TListFormData } from '@/types';
import { TList } from '@/db/types';
import { Modal } from '@/components/Modal';

import * as s from './styles.module.scss';
import { getContrastYIQ } from '@/utils/getContrastColor';

type TListFormProps = {
	isOpen: boolean;
	list?: TList;

	onSubmit: (data: TListFormData, id?: number) => void;
	onClose: () => void;
};

const defaultColor = '#ff0000';

export const ListForm = ({
	isOpen,
	list,
	onSubmit,
	onClose,
}: TListFormProps) => {
	const [name, setName] = useState('');
	const [color, setColor] = useState(defaultColor);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data: TListFormData = {
			name,
			color,
		};

		onSubmit(data, list?.id);
	};

	useEffect(() => {
		if (!isOpen) {
			setName('');
			setColor(defaultColor);
			return
		}

		setName(list?.name || '');
		setColor(list?.color || defaultColor);
	}, [list, isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={(e) => e.preventDefault()}>
				<div
					className={s.Header}
					style={{
						background: color,
						color: getContrastYIQ(color),
					}}
				>
					{color}
					<h2>Список</h2>
					<div>
						<input
							name='name'
							value={name}
							placeholder='Введите название'
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>

				<div className={s.Body}>
					<div>
						<input
							name='color'
							type='color'
							value={color}
							placeholder='Выберите цвет'
							onChange={(e) => setColor(e.target.value)}
						/>
					</div>

					<div className={s.Actions}>
						<button type='button' onClick={onClose}>
							Отмена
						</button>
						<button type='button' onClick={handleSubmit}>
							Сохранить
						</button>
					</div>
				</div>
			</form>
		</Modal>
	);
};
