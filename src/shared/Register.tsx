import { useAppDispatch, useAppSelector } from '@/app/hook';
import { toastAlert } from '@/helpers/AppHelper';
import { registerUser } from '@/rtk/features/user/userSlice';
import { size } from 'lodash';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.svg';
import Error from './Error';

interface IMutationData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.user);
	const [mutationData, setMutationData] = useState<IMutationData>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const handleChange = (type: string, value: string) => {
		setMutationData((prevData) => ({ ...prevData, [type]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const updatedData = {
			email: mutationData.email,
			password: mutationData.password,
		};

		if (mutationData?.password !== mutationData.confirmPassword) {
			setError('Password does not match');
		} else if (size(updatedData)) {
			setError('');
			dispatch(registerUser(updatedData))
				.unwrap()
				.then((payload) => {
					console.log(payload, 'successfully registered');
					navigate('/');
				})
				.catch((err) => {
					toastAlert('error', err?.message || err?.error);
				});
		}
	};
	return (
		<section className="py-6 bg-primary h-screen grid place-items-center">
			<div className="mx-auto max-w-md px-5 lg:px-0">
				<div>
					<Link to="/">
						<img className="h-12 mx-auto" src={Logo} alt="logo" />
					</Link>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
						Create Your New Account
					</h2>
				</div>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm space-y-2">
						<div>
							<label htmlFor="name" className="sr-only">
								Name
							</label>
							<input
								id="name"
								name="name"
								type="name"
								autoComplete="name"
								required
								className="login-input rounded-t-md w-full"
								placeholder="Your name"
								onChange={(e) => handleChange('name', e.target.value)}
							/>
						</div>
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
								className="login-input w-full"
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
								className="login-input w-full"
								placeholder="Password"
								onChange={(e) => handleChange('password', e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="confirm-password" className="sr-only">
								Confirm Password
							</label>
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								autoComplete="confirm-password"
								required
								className="login-input rounded-b-md w-full"
								placeholder="Confirm password"
								onChange={(e) =>
									handleChange('confirmPassword', e.target.value)
								}
							/>
						</div>
					</div>

					<div>
						<button
							disabled={isLoading}
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
						>
							{isLoading ? 'Authenticating...' : ' Create Account'}
						</button>
					</div>

					{/* error message */}
					{error && <Error message={error} />}

					<p className="text-sm text-center mt-3">
						Already have an account?{' '}
						<span
							onClick={() => navigate('/login')}
							className="cursor-pointer font-medium text-violet-600 hover:text-violet-500"
						>
							Login
						</span>
					</p>
				</form>
			</div>
			<ToastContainer />
		</section>
	);
};

export default Register;
