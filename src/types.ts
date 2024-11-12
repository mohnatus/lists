export type TStatus = 'idle' | 'loading' | 'success' | 'error'

export type TList = {
  id: string
  name: string
}

export type TListData = {
  [K in Exclude<keyof TList, 'id'>]: TList[K]
}

export type TItem = {
  id: string
  name: string
}

export type TItemData = {
  [K in Exclude<keyof TItem, 'id'>]: TItem[K]
}