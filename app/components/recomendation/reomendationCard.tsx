import React from 'react';
import { IoIosStar } from 'react-icons/io';
import { IoListOutline } from 'react-icons/io5';
import { MdFavorite } from 'react-icons/md';
import { BaseMovieTV, isMovieData, TBaseApiResponse } from '~/tyoes';
import { formatDate } from '~/lib/utils';
import { twMerge } from 'tailwind-merge';
import useCustomFetcher from '~/hooks/useCustomFetcher';

interface RecommendationCardProps {
	cardData: BaseMovieTV;
}

const RecommendationCard = ({ cardData }: RecommendationCardProps) => {
	// if (!data) {
	// 	return null;
	// }

	const isMovie = isMovieData(cardData);

	const actionButton = [
		{
			id: 1,
			lable: 'Rate it!',
			icon: IoIosStar,
			isActive: false,
		},
		{
			id: 2,
			lable: 'Favorite',
			icon: MdFavorite,
			isActive: cardData.isFavourite || false,
		},
		{
			id: 3,
			lable: 'Add to watchlist',
			icon: IoListOutline,
			isActive: false,
		},
	];

	const {
		fetcher: favouriteMediaFetcher,
		data: favouriteMediaData,
		fetcherState: favouriteMediaFetchState,
	} = useCustomFetcher<TBaseApiResponse | undefined>(undefined);

	const handleFavorite = () => {
		// console.log('in handle favorite');
		//
		// const payload: TBaseAction = {
		// 	media_type: isMovie ? 'movie' : 'tv',
		// 	media_id: data.id,
		// 	favorite: !data.isFavourite || false,
		// };
		// favouriteMediaFetcher.submit(payload, { action: '#', method: 'POST' });
	};

	console.log('fetcher data', favouriteMediaData, cardData.id, 'fetcher data');

	return (
		<div className="h-60 w-full overflow-hidden rounded-lg border">
			<div
				key="poster_detail"
				className="flex h-[60%] w-full items-center justify-center gap-4 border-b"
			>
				<div className="h-full w-24 flex-none">
					<img
						loading="lazy"
						className="poster w-full"
						src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${cardData.poster_path}`}
						srcSet={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${cardData.poster_path} 1x, https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${cardData.poster_path} 2x`}
						alt="Wednesday"
					/>
				</div>

				<div>
					<div className="font-semibold">
						{isMovie ? cardData.title : cardData.name}
					</div>
					<div className="text-[0.80rem] text-gray-500">
						{isMovie
							? formatDate(cardData.release_date)
							: formatDate(cardData.first_air_date)}
					</div>
					<p className="mt-4 line-clamp-2 text-[0.80rem]">
						{cardData.overview}
					</p>
				</div>
			</div>

			{favouriteMediaFetchState}
			<div
				key="actions"
				className="grid h-[40%] w-full grid-cols-2 content-between justify-between px-3 py-2"
			>
				{actionButton.map(m => (
					<div key={m.id} className="flex items-center gap-2 text-gray-500">
						<div
							className={twMerge(
								`flex h-8 w-8 items-center justify-center rounded-full border border-gray-300`,
								m.isActive && 'bg-gray-500 text-white'
							)}
							onClick={() => {
								console.log(m.lable);
								if (m.id == 2) {
									handleFavorite();
								}
							}}
						>
							<m.icon />
						</div>
						{m.lable}
					</div>
				))}
			</div>
		</div>
	);
};

export default RecommendationCard;
