import React from 'react';
import { useParams } from 'react-router-dom';

export const List = () => {
  const { listId } = useParams()

	return <div>List {listId} </div>;
};
