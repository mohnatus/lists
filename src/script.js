import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/App';
import { Home } from '@/pages/Home';
import { ListView } from '@/pages/ListView';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Home /> },
			{
				path: '/list/:listId',
				element: <ListView />,
			},
		],
	},
]);

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
