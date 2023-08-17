import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
	return (
		<div>
			<Navbar />
			<div className="pt-0">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
