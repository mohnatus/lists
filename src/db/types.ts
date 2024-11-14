export type TList = {
	id: number;
	name: string;
	color: string;
	order: number;
	parent: number;
	isDefault: boolean
};

export type TListData = {
	[K in Exclude<keyof TList, 'id' | 'order' | 'isDefault' | 'parent'>]: TList[K];
} & {
	parent?: TList['parent']
};

export type TItem = {
	id: number;
	name: string;
	list: number;
	checked: boolean;
	order: number;
};

export type TItemData = {
	[K in Exclude<keyof TItem, 'id' | 'checked' | 'order'>]: TItem[K];
};
