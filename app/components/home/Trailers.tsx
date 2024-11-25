import React from 'react';
import FilterMenu from '~/components/home/filterMenu';

const Trailers = () => {
	return (
		<div id="trailer" className="h-full w-full bg-[#032541] py-2">
			<FilterMenu
				darkTheme={true}
				menuTitle="Latest Trailers"
				menuOptions={[
					'Popular',
					'Streaming',
					'On TV',
					'For Rent',
					'In Theaters',
				]}
			/>
			<div
				key="traler_card"
				className="scrollbar scrollbar-track-transparent scrollbar-thumb-gray-500 flex h-full w-full gap-4 overflow-x-auto px-5 py-5"
			>
				{['', '', '', '', '', '', '', '', '', '', '', '', '', ''].map(
					(val, i) => (
						<div key={i} className="flex flex-col items-center text-white">
							<div className="h-40 w-72 rounded-lg bg-white/40"></div>
							<span className="font-bold">Blitz</span>
							<span className="text-sm">
								Banded together, asked to do our best
							</span>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default Trailers;
