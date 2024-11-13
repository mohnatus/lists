export type TList = {
	id: number;
	name: string;
  order: number;
};

export type TListData = {
	[K in Exclude<keyof TList, 'id' | 'order'>]: TList[K];
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
