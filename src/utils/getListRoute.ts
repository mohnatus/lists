
export function getListRoute(listId: number) {
	if (!listId) return null;

	return `/list/${listId}`;
}
