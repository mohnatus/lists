export type TList = {
	id: number;
	name: string;
};

export type TListData = {
	[K in Exclude<keyof TList, 'id'>]: TList[K];
};

export type TItem = {
	id: number;
	name: string;
	list: number;
	checked: boolean;
};

export type TItemData = {
	[K in Exclude<keyof TItem, 'id' | 'checked'>]: TItem[K];
};
