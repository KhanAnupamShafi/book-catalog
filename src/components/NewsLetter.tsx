export default function NewsLetter() {
	return (
		<div className="mt-12 bg-no-repeat overflow-hidden text-zinc-800 text-sm bg-[url(https://htmldemo.net/boighor/boighor/images/bg/2.jpg)] bg-center">
			<div className=" px-3">
				<div className="flex flex-wrap -ml-3.5 -mr-3.5">
					<div className="w-full ml-[31.41rem] py-36">
						<div className="mx-auto text-center">
							<h2 className="clear-both text-3xl font-bold mb-5 uppercase">
								Stay With Us
							</h2>
						</div>
						<div className="mt-5 text-center">
							<p className="pb-16 px-16">
								Subscribe to our newsletters now and stay up-to-date with new
								collections, awesome books and more.
							</p>
							<form>
								<div className="inline-block mt-1 relative">
									<input
										type="email"
										placeholder="Enter your e-mail"
										className="h-12 w-96 border-b cursor-text inline-block text-xs py-3 pl-3.5 pr-36 border-neutral-400 border-solid"
									/>
									<button className="items-start bottom-0 cursor-pointer font-bold pl-9 pr-3.5 absolute right-0 uppercase top-0">
										Subscribe
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
