import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderStars = (rating: number): React.ReactNode => {
	const starIcons: React.ReactNode[] = [];
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	// Render full stars
	for (let i = 0; i < fullStars; i++) {
		starIcons.push(<FontAwesomeIcon icon={faStar} key={i} />);
	}

	// Render half star if applicable
	if (hasHalfStar) {
		starIcons.push(<FontAwesomeIcon icon={faStarHalfAlt} key={fullStars} />);
	}

	// Fill remaining stars with empty stars
	const emptyStars = 5 - starIcons.length;
	for (let i = 0; i < emptyStars; i++) {
		starIcons.push(
			<FontAwesomeIcon icon={faStar} key={`empty-${i}`} opacity={0.4} />
		);
	}

	return starIcons;
};

export default renderStars;
