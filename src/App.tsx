import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Lists } from '@/containers/Lists';
import { ListView } from '@/containers/ListView';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Lists />,
	},
	{
		path: '/list/:listId',
		element: <ListView />,
	},
]);

export const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};
