import { Link } from 'react-router-dom';
import banner1 from '../assets/banner1.png';
import cover from '../assets/cover.png';
export default function Landing() {
	return (
		<div
			className={`bg-[#ffeed2] overflow-hidden bg-no-repeat text-zinc-800 text-sm bg-[url(${cover})] bg-center`}
		>
			<div className="text-center ">
				<div className="flex flex-wrap -ml-3.5 -mr-3.5">
					<div className="relative mx-auto w-[800px] py-36 px-3">
						<div className="absolute right-0 top-4 ml-auto text-right">
							<div className="bg-[#ffeed2] flex gap-2 flex-col justify-center">
								<div className=" w-44 text-neutral-900 float-left text-sm text-center align-top">
									<Link to={'/all-books'}>
										<div className="text-teal-800 cursor-pointer">
											<img
												src={banner1}
												className="rounded  h-[98%] w-[99%] overflow-clip"
											/>{' '}
										</div>
									</Link>

									<div>
										<strong className="font-bold">
											<div className="text-teal-800 cursor-pointer">
												The Season's Anticipated Mysteries
											</div>
										</strong>
									</div>
								</div>
								{/* <div className="w-44 text-neutral-900 float-left text-sm text-center align-bottom">
									<div className="text-teal-800 cursor-pointer">
										<img
											src="https://images.gr-assets.com/misc/1682957909-1682957909_goodreads_misc.png"
											className="h-[98%] w-[98%] overflow-clip rounded"
										/>{' '}
									</div>

									<div>
										<strong className="font-bold">
											<div className="text-teal-800 cursor-pointer">
												The Big Books of Summer
											</div>
										</strong>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
