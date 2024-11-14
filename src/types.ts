export type TStatus = 'idle' | 'loading' | 'success' | 'error';

export type TListFormData = {
	name: string;
	color: string;
};

export type TItemFormData = {
	name: string;
};

export type TSortHandler = ({
	oldIndex,
	newIndex,
}: {
	oldIndex: number;
	newIndex: number;
}) => void;
