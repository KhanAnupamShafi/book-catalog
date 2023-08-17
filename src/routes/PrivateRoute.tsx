import { useAppSelector } from '@/app/hook';
import { LoadingSpinnerAuth } from '@/shared/LoadingSpinner';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
	children: ReactNode;
}
export default function PrivateRoute({ children }: IProps) {
	const { user, isLoading } = useAppSelector((state) => state.user);
	const { pathname } = useLocation();

	if (isLoading) return <LoadingSpinnerAuth />;

	if (!isLoading && !user.email)
		return <Navigate to="/login" state={{ from: pathname }} />;
	return children;
}
