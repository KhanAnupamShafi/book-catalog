import { useAppDispatch, useAppSelector } from '@/app/hook';
import { auth } from '@/lib/firebase';
import { setUser } from '@/rtk/features/user/userSlice';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Brand from '../assets/brand.png';

export default function StickyBar() {
	const [isSticky, setIsSticky] = useState(false);
	const navbarRef = useRef<HTMLDivElement>(null);
	const originalTop = useRef<number | null>(null);

	const { user, isLoading } = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		signOut(auth).then(() => {
			// Sign-out successful.
			dispatch(setUser(null));
		});
	};
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsSticky(scrollPosition > 150);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			ref={navbarRef}
			className={`flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full z-30 ${
				isSticky ? 'fixed top-0 left-0 right-0 py-8 px-[6%]' : ''
			}`}
		>
			{/* Logo Container */}
			<div className="flex items-center">
				{/* Logo */}
				<Link to="/" className="cursor-pointer">
					<h3 className="text-2xl font-medium text-blue-500">
						<img src={Brand} width="150px" className="object-contain" alt="" />
					</h3>
				</Link>
			</div>

			{/* Links Section */}
			<ul className="hidden md:flex items-center space-x-8">
				<Link
					to="/all-books"
					className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
				>
					<li>All Books</li>
				</Link>
				<Link
					to="add-book"
					className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600"
				>
					<li>Add Book</li>
				</Link>
				<Link
					to="/all-books"
					className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
				>
					<li>Blog</li>
				</Link>
				<Link
					to="/all-books"
					className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
				>
					<li>About</li>
				</Link>
				<Link
					to="/all-books"
					className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
				>
					<li>Contact</li>
				</Link>
			</ul>
			{!isLoading && !user.email && (
				<div className="flex items-center space-x-5">
					{/* Register */}
					<Link
						to="/register"
						className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
					>
						<svg
							className="fill-current h-5 w-5 mr-2 mt-0.5"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							version="1.1"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M12 0L11.34 .03L15.15 3.84L16.5 2.5C19.75 4.07 22.09 7.24 22.45 11H23.95C23.44 4.84 18.29 0 12 0M12 4C10.07 4 8.5 5.57 8.5 7.5C8.5 9.43 10.07 11 12 11C13.93 11 15.5 9.43 15.5 7.5C15.5 5.57 13.93 4 12 4M12 6C12.83 6 13.5 6.67 13.5 7.5C13.5 8.33 12.83 9 12 9C11.17 9 10.5 8.33 10.5 7.5C10.5 6.67 11.17 6 12 6M.05 13C.56 19.16 5.71 24 12 24L12.66 23.97L8.85 20.16L7.5 21.5C4.25 19.94 1.91 16.76 1.55 13H.05M12 13C8.13 13 5 14.57 5 16.5V18H19V16.5C19 14.57 15.87 13 12 13M12 15C14.11 15 15.61 15.53 16.39 16H7.61C8.39 15.53 9.89 15 12 15Z" />
						</svg>
						Register
					</Link>

					{/* Login */}
					<Link
						to="/login"
						className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600"
					>
						<svg
							className="fill-current h-5 w-5 mr-2 mt-0.5"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							version="1.1"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
						</svg>
						Login
					</Link>
				</div>
			)}

			{isLoading && !user.email && (
				<div className="flex items-center space-x-5">
					<LoadingSpinner />
				</div>
			)}
			{user.email && (
				<div className="flex items-center space-x-5">
					{/* Logout */}
					<p className="text-sm">
						Hello, <span className="italic text-blue-500">{user?.email}</span>
					</p>
					<button
						onClick={handleLogout}
						className="flex text-red-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600"
					>
						<svg
							className="fill-current h-5 w-5 mr-2 mt-0.5"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							version="1.1"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
						</svg>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
