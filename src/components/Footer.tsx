import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className="bg-gray-200 py-4">
			<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
				<Link className="hover:text-gray-900" to="/">
					Home
				</Link>
				<Link className="hover:text-gray-900" to="/">
					About
				</Link>
				<Link className="hover:text-gray-900" to="/">
					Services
				</Link>
				<Link className="hover:text-gray-900" to="/">
					Media
				</Link>
				<Link className="hover:text-gray-900" to="/">
					Gallery
				</Link>
				<Link className="hover:text-gray-900" to="/">
					Contact
				</Link>
			</nav>

			<div className="flex justify-center space-x-5 my-5">
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
				</a>
				<a
					href="https://linkedin.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
				</a>
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
				</a>
				<a
					href="https://messenger.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
				</a>
				<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
					<img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
				</a>
			</div>
			<div className="container mx-auto text-center">
				<p className="text-gray-600">
					© 2023 Khan Anupam Shafi. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
