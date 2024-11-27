import React from 'react';
import { twMerge } from 'tailwind-merge';
import RoundedProgressBar from '~/components/prgressbar';

const MovieDetail = () => {
	return (
		<div className="h-full w-full bg-red-700">
			<div key="banner" className="relative bg-blue-700">
				<div className="h-full w-[100vw] min-w-[100vw]">
					<div className="relative h-[calc(100vw/2.222222)] w-full min-w-[100vw] overflow-hidden">
						<div
							className={twMerge(
								'h-full w-full min-w-full bg-cover bg-no-repeat',
								'bg-[calc((((100vw/2.222222)-20px)/1.5)/2)_0]'
							)}
							style={{
								backgroundImage: `url(${twMerge('https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces/vIgyYkXkg6NC2whRbYjBD7eb3Er.jpg')}`,
							}}
						>
							<div
								className={
									'absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(10.5,31.5,52.5,1)_20%,rgba(10.5,31.5,52.5,0)_50%)]'
								}
							></div>
							<div className="w-[calc(((100vw/2.222222) - 40px)/1.5)] min-w-[calc(((100vw/2.222222) - 40px)/1.5)] h-[calc((100vw/2.222222) - 40px)] min-h-[calc((100vw/2.222222) - 40px)] absolute left-5 top-5 z-[4] overflow-hidden">
								<img
									className="hidden h-full min-h-full w-full min-w-full max-md:block"
									src="https://media.themoviedb.org/t/p/w116_and_h174_face/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg"
									srcSet="https://media.themoviedb.org/t/p/w116_and_h174_face/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg 1x, https://media.themoviedb.org/t/p/w220_and_h330_face/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg 2x"
									alt="Venom: Let There Be Carnage"
								/>

								<img
									className="hidden h-full min-h-full w-full min-w-full md:block"
									src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg"
									srcSet="https://media.themoviedb.org/t/p/w300_and_h450_bestv2/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg 1x, https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg 2x"
									alt="Venom: Let There Be Carnage"
								/>
							</div>
						</div>
					</div>

					<div className="text-2xl font-semibold text-white">
						Venom: Let There Be Carnage
					</div>

					<div className="flex items-center justify-center gap-4 py-3 text-white">
						<div className="flex items-center gap-2">
							<div className="h-12 w-12">
								<RoundedProgressBar progress={68} />
							</div>
							<span className="font-semibold">User Score</span>
						</div>

						<hr className="h-5 border-l border-[#FFFFFF4D]" />
						<div className="font-semibold">What is your Vibe?</div>
					</div>

					<div className="flex w-full items-center justify-center gap-2 border-b border-t bg-[#0a1d30] py-2 text-white">
						<div className="border border-[#FFFFFF99] p-0.5 text-sm text-[#FFFFFF99]">
							PG-13
						</div>
						<div className="text-sm">
							10/01/2021 (US) • lh37m PlayTrai1er <br /> Science fiction,
							Action, Adventure
						</div>
					</div>

					<div>Joy, hope, loss, love, life happens...</div>
					<div>Overview</div>
					<div>
						An odyssey through time and memory, centered around a place in New
						England where—from wilderness, and then, later, from a home—love,
						loss, struggle, hope and legacy play out between couples and
						families over generations.
					</div>

					<div className="flex">
						<div>
							<div>Robert Zemeckis</div>
							<div>Director, Screenplay</div>
						</div>
						<div>
							<div>Eric Roth</div>
							<div>Screenplay</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
