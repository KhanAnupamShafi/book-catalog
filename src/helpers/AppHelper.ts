import { toast } from 'react-toastify';

// toast position
const position = {
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 3000,
};

// alert message
export const toastAlert = (type: string, value: string) => {
	if (type === 'success') {
		toast.success(value, position);
	} else if (type === 'error') {
		toast.error(value, position);
	} else if (type === 'warning') {
		toast.warning(value, position);
	}
};
