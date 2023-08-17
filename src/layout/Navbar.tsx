// import { useDispatch } from 'react-redux';
import Promo from '@/components/Promo';
import Social from '@/components/Social';
import StickyBar from '@/components/StickyBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Bg from '../assets/bg.webp';
import Logo from '../assets/logo.svg';

const Navbar = () => {
	const [isDismissVisible, setIsDismissVisible] = useState(true);

	return (
		<nav className={`pt-4 bg-[url(${Bg})] bg-center bg-scroll bg-clip-border`}>
			<div className="container flex items-center justify-between">
				<Link to="/">
					<img src={Logo} width="150px" className="object-contain" alt="" />
				</Link>

				<Promo
					isDismissVisible={isDismissVisible}
					setIsDismissVisible={setIsDismissVisible}
				/>

				<div className="flex items-center">
					<div className="group relative rounded-md bg-[#ffeed2]">
						<Social />
					</div>
				</div>
			</div>
			<StickyBar />
		</nav>
	);
};

export default Navbar;
