import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

interface RateProps {
	count: number;
	rating: number;
	color: {
		filled: string;
		unfilled: string;
	};
	onRating: (rate: number) => void;
}

const Rate = ({ count, rating, color, onRating }: RateProps) => {
	const [hoverRating, setHoverRating] = useState(0);
	// console.log('Rating Prop:', rating);
	const getColor = (index: number) => {
		if (hoverRating >= index) {
			return color.filled;
		} else if (!hoverRating && rating >= index) {
			return color.filled;
		}

		return color.unfilled;
	};

	const starRating = useMemo(() => {
		return Array(count)
			.fill(0)
			.map((_, i) => i + 1)
			.map((idx) => (
				<FontAwesomeIcon
					key={idx}
					className="cursor-pointer"
					icon="star"
					onClick={() => onRating(idx)}
					style={{ color: getColor(idx) }}
					onMouseEnter={() => setHoverRating(idx)}
					onMouseLeave={() => setHoverRating(0)}
				/>
			));
	}, [count, rating, hoverRating]);

	return <div>{starRating}</div>;
};

Rate.propTypes = {
	count: PropTypes.number,
	rating: PropTypes.number,
	onRating: PropTypes.func.isRequired,
	color: PropTypes.shape({
		filled: PropTypes.string,
		unfilled: PropTypes.string,
	}),
};

Rate.defaultProps = {
	count: 5,
	rating: 0,
	color: {
		filled: '#f5a83b',
		unfilled: '#DCDCDC',
	},
};

export default Rate;
