import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';

const Login = () => {
	const { pathname } = useLocation();
	//   const [login, { isLoading }] = useLoginMutation();
	const [mutationData, setMutationData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toastId = useRef(null);

	const handleChange = (type: string, value: string) => {
		setMutationData((prevData) => ({ ...prevData, [type]: value }));
	};

	console.log(mutationData);
	const handleSubmit = (e) => {
		e.preventDefault();
		//  toast.dismiss(toastId.current);

		//  if (size(mutationData)) {
		//    login(mutationData)
		//      .unwrap()
		//      .then((payload) => {
		//        const { accessToken, user } = payload || {};
		//        const result = {
		//          accessToken,
		//          user,
		//        };

		//        if (pathname === "/" && user?.role !== "student") {
		//          toastAlert("warning", "You're not a student!");
		//        } else if (pathname === "/admin" && user?.role !== "admin") {
		//          toastAlert("warning", "You're not a admin!");
		//        } else {
		//          if (size(result)) {
		//            localStorage.setItem("auth", JSON.stringify(result));
		//            dispatch(userLoggedIn(result));
		//          }

		//          if (user?.role === "admin") {
		//            navigate("/admin/dashboard");
		//          } else if (user?.role === "student") {
		//            navigate("/course-player");
		//          }
		//        }
		//      })
		//      .catch((err) => {
		//        toastAlert("error", err?.data || err?.error);
		//      });
		//  }
	};

	return (
		<section className="py-12 h-screen grid place-items-center">
			<div className="mx-auto max-w-md px-5 lg:px-0 ">
				<div>
					<Link to="/">
						<img className="h-12 mx-auto" src={Logo} alt="logo" />
					</Link>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
						Sign in to your Account
					</h2>
				</div>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="login-input rounded-t-md w-full"
								placeholder="Email address"
								onChange={(e) => handleChange('email', e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="login-input rounded-b-md w-full"
								placeholder="Password"
								onChange={(e) => handleChange('password', e.target.value)}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end">
						<div className="text-sm">
							<Link
								to={pathname}
								className="font-medium text-violet-600 hover:text-violet-500"
							>
								Forgot your password?
							</Link>
						</div>
					</div>
					<div>
						<button
							type="submit"
							//   disabled={isLoading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
						>
							{/* {isLoading ? 'Authenticating...' : 'Sign in'} */}
						</button>
					</div>

					<p className="text-sm text-center mt-3">
						Don't have an account?{' '}
						<span
							onClick={() => navigate('/register')}
							className="cursor-pointer font-medium text-violet-600 hover:text-violet-500"
						>
							Create an account
						</span>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Login;
