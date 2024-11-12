export type TItem = {
  id: string
  name: string
}

export type TItemData = {
  [K in Exclude<keyof TItem, 'id'>]: TItem[K]
}