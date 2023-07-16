import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import AllBooks from '@/pages/AllBooks';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Login from '@/shared/Login';
import Register from '@/shared/Register';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'all-books',
				element: <AllBooks />,
			},
		],
	},

	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default routes;
