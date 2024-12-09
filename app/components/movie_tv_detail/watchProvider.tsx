import React from 'react';
import { FaBookmark, FaList, FaStar } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { Flatrate } from '~/tyoes';


interface WatchProviderProps {
	provider: Flatrate;
}

const WatchProvider = ({ provider }: WatchProviderProps) => {
	return (
		<div className="fixed bottom-0 z-10 flex h-[6.5rem] w-full flex-col justify-between bg-[#032541] bg-opacity-80 py-4 backdrop-blur-lg">
			<div>
				<div className="flex w-full items-center justify-center gap-3">
					<div className="h-9 w-9 overflow-hidden rounded-md">
						<img
							src={`https://media.themoviedb.org/t/p/original/${provider.logo_path}`}
							alt="provdier"
						/>
					</div>
					<div>
						<div className="text-sm leading-3 text-gray-300">
							Now Streaming
						</div>
						<div className="text-sm font-semibold text-white">Watch Now</div>
					</div>
				</div>
			</div>
			<div className="mx-auto flex w-full items-center justify-between px-10 text-white">
				<div>
					<FaList />
				</div>
				<div>
					<MdFavorite />
				</div>
				<div>
					<FaBookmark />
				</div>
				<div>
					<FaStar />
				</div>
			</div>
		</div>
	);
};

export default WatchProvider;
