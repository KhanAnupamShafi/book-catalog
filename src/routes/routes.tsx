import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import AddBook from '@/components/Addbook';
import EditBook from '@/components/Editbook';
import AllBooks from '@/pages/AllBooks';
import BookDetails from '@/pages/BookDetails';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Login from '@/shared/Login';
import Register from '@/shared/Register';
import PrivateRoute from './PrivateRoute';

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
			{
				path: 'add-book',
				element: (
					<PrivateRoute>
						<AddBook />
					</PrivateRoute>
				),
			},
			{
				path: 'book-details/:id',
				element: <BookDetails />,
			},
			{
				path: 'edit-book/:id',
				element: (
					<PrivateRoute>
						<EditBook />
					</PrivateRoute>
				),
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
