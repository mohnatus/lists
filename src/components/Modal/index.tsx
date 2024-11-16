import React, { PropsWithChildren } from 'react';

import * as s from './styles.module.scss';
import { createPortal } from 'react-dom';

type TModalProps = PropsWithChildren & {
	isOpen: boolean;
	onClose: () => void;
};

export const Modal = ({ isOpen, onClose, children }: TModalProps) => {
	const handleClose = () => {
		onClose();
	};

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className={s.Root}>
			<div className={s.Mask} onClick={handleClose}></div>
			<div className={s.Container}>
				<div className={s.Wrapper}>
					<div className={s.Frame}>{children}</div>
				</div>
			</div>
		</div>,
		document.getElementById('modals')
	);
};
