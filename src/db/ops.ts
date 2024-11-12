import { openDB } from 'idb';

import {
	DB_NAME,
	DB_VERSION,
	ITEMS_STORE_NAME,
	LISTS_STORE_NAME,
} from './constants';

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
	upgrade(db) {
		db.createObjectStore(LISTS_STORE_NAME);
		db.createObjectStore(ITEMS_STORE_NAME);
	},
});

export async function getAll(storeName, key?) {
	return (await dbPromise).getAll(storeName, key);
}
export async function setValue(storeName, key, val) {
	return (await dbPromise).add(storeName, val, key);
}
export async function deleteValue(storeName, key) {
	return (await dbPromise).delete(storeName, key);
}
export async function clearStore(storeName) {
	return (await dbPromise).clear(storeName);
}
export async function getKeys(storeName) {
	return (await dbPromise).getAllKeys(storeName);
}
