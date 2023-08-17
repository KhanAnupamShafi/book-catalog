import { FadeLoader, GridLoader, HashLoader } from 'react-spinners';

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: '#3b70f6',
};

const LoadingSpinner = ({ customClass = 'h-1' }) => {
	return (
		<div className={`${customClass} flex align-center justify-center`}>
			<GridLoader
				color="#3B82F6"
				loading={true}
				size={6}
				cssOverride={override}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			<GridLoader
				color="#3B82F6"
				loading={true}
				size={6}
				cssOverride={override}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			<GridLoader
				color="#3B82F6"
				loading={true}
				size={6}
				cssOverride={override}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};
export const LoadingSpinnerAuth = ({ customClass = 'h-1' }) => {
	return (
		<div className={`${customClass} flex align-center justify-center`}>
			<HashLoader
				color="#3B82F6"
				loading={true}
				size={32}
				cssOverride={override}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default LoadingSpinner;
