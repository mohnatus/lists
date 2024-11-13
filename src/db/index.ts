/**
 *
 * https://dexie.org/docs/Tutorial/React
 *
 * */

import Dexie, { type EntityTable } from 'dexie';

import { TItem, TList } from './types';

import {
	DB_NAME,
	DB_VERSION,
	ITEMS_STORE_NAME,
	LISTS_STORE_NAME,
} from './constants';

const db = new Dexie(DB_NAME) as Dexie & {
	[LISTS_STORE_NAME]: EntityTable<TList, 'id'>;
	[ITEMS_STORE_NAME]: EntityTable<TItem, 'id'>;
};

db.version(DB_VERSION).stores({
	[LISTS_STORE_NAME]: '++id',
	[ITEMS_STORE_NAME]: '++id,list',
});

export { db };
