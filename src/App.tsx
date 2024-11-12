import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Lists } from '@/containers/Lists';
import { List } from '@/containers/List';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Lists />,
	},
	{
    path: "/list/:listId",
    element: <List />,
  },
]);

export const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};
