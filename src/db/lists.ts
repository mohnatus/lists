import type { TList } from '@/types';

import { LISTS_STORE_NAME } from './constants';
import { getAll, setValue } from './ops';

export async function getListsFromDb() {
	return await getAll(LISTS_STORE_NAME);
}

export async function addListToDb(listData: TList) {
	return await setValue(LISTS_STORE_NAME, listData.id, listData);
}
