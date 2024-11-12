import React, { useState } from 'react'

import type { TItemData } from '@/types'

type TItemFormProps = {
  onSubmit: (data: TItemData) => void
}

export const ItemForm = ({ onSubmit }: TItemFormProps ) => {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data: TItemData = {
      name
    }
    onSubmit(data)
  }

  return <form onSubmit={handleSubmit}>
    <input name="name" value={name} onChange={e => setName(e.target.value)} />
  </form>
}