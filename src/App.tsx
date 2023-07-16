import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './app/hook';
import MainLayout from './layout/MainLayout';
import { auth } from './lib/firebase';
import { setLoading, setUser } from './rtk/features/user/userSlice';

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setLoading(true));
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setLoading(false));
				dispatch(setUser(user.email));
			} else {
				dispatch(setLoading(false));
			}
		});
	}, []);
	return (
		<div>
			<MainLayout />
			<ToastContainer />
		</div>
	);
}

export default App;
