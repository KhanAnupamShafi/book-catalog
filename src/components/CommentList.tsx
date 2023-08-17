import { useAppSelector } from '@/app/hook';
import formatDate from '@/helpers/FormatDate';
import renderStars from '@/shared/RenderStar';
import { Review } from '@/types/globalTypes';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Guy from '../assets/guy.png';
export default function CommentList({ comment }: { comment: Review }) {
	const { user: loggedUser } = useAppSelector((state) => state.user);
	const { comment: text, id, rating, user, updatedAt } = comment || {};
	return (
		<div className="relative grid grid-cols-1 gap-2 p-4 mb-6 border rounded-lg bg-white shadow-lg">
			<div className="relative flex gap-4">
				<img
					src={Guy}
					width={80}
					className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
					alt=""
					loading="lazy"
				/>

				<div className="flex flex-col w-full">
					<div className="flex flex-row justify-between">
						<p className="relative font-semibold whitespace-nowrap truncate overflow-hidden">
							{loggedUser?.email === user ? (
								<span className="text-green-600">You</span>
							) : (
								user
							)}
						</p>

						<div className="relative text-gray-500 text-xl">
							{renderStars(rating)}({rating}){' '}
							{loggedUser?.email === user && (
								<span className="cursor-pointer ml-2">
									<FontAwesomeIcon color="#da2121" icon={faCancel} size="xs" />
								</span>
							)}
						</div>
					</div>
					<p className="text-gray-400 text-xs">{formatDate(updatedAt)}</p>
				</div>
			</div>
			<p className="-mt-4 text-gray-500 text-sm">{text}</p>
		</div>
	);
}
