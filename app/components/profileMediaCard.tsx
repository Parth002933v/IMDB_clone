import React from 'react';
import { IoIosStar } from 'react-icons/io';
import { IoListOutline } from 'react-icons/io5';
import { MdFavorite } from 'react-icons/md';
import { BaseMovieTV, isMovieData, TBaseAction, TBaseApiResponse } from '~/tyoes';
import { formatDate } from '~/lib/utils';
import { twMerge } from 'tailwind-merge';
import useCustomFetcher from '~/hooks/useCustomFetcher';
import { Link } from 'react-router';
import { IconBaseProps } from 'react-icons';

interface RecommendationCardProps {
	cardData: BaseMovieTV;
}

const ProfileMediaCard = ({ cardData }: RecommendationCardProps) => {
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
			isActive: cardData.isWatchListed || false,
		},
	];

	// console.log('fetcher data', favouriteMediaData, cardData.id, 'fetcher data');

	return (
		<div className="mx-auto h-60 w-full max-w-[1350px] overflow-hidden rounded-lg border">
			<div
				key="poster_detail"
				className="flex h-full w-full items-center justify-center gap-4 overflow-hidden max-md:h-[60%] max-md:border-b"
			>
				<PosterItem cardData={cardData} />

				<div>
					<DetailItem cardData={cardData} />
					<div className="mt-4 max-md:hidden">
						<ActionItems cardData={cardData} actionButton={actionButton} />
					</div>
				</div>
			</div>

			<div className="h-[40%] md:hidden">
				<ActionItems cardData={cardData} actionButton={actionButton} />
			</div>
		</div>
	);
};

export default ProfileMediaCard;

const DetailItem = ({ cardData }: { cardData: BaseMovieTV }) => {
	const isMovie = isMovieData(cardData);

	return (
		<>
			<Link
				viewTransition
				to={`/${isMovie ? 'movie' : 'tv'}/${cardData.id}-${isMovie ? `${cardData.title.replaceAll(' ', '-')}` : `${cardData.name.replaceAll(' ', '-')}`}`}
				className="font-semibold"
			>
				{isMovie ? cardData.title : cardData.name}
			</Link>
			<div className="text-[0.80rem] text-gray-500">
				{isMovie
					? formatDate(cardData.release_date)
					: formatDate(cardData.first_air_date)}
			</div>
			<p className="mt-4 line-clamp-2 text-[0.80rem]">{cardData.overview}</p>
		</>
	);
};

const PosterItem = ({ cardData }: { cardData: BaseMovieTV }) => {
	const isMovie = isMovieData(cardData);
	return (
		<Link
			to={`/${isMovie ? 'movie' : 'tv'}/${cardData.id}-${isMovie ? `${cardData.title.replaceAll(' ', '-')}` : `${cardData.name.replaceAll(' ', '-')}`}`}
			className="h-full w-24 flex-none  md:w-36"
		>
			<img
				loading="lazy"
				className="poster h-full w-full object-cover object-center"
				src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${cardData.poster_path}`}
				srcSet={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2/${cardData.poster_path} 1x, https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${cardData.poster_path} 2x`}
				alt={isMovie ? cardData.title : cardData.name}
			/>
		</Link>
	);
};

const ActionItems = ({
	cardData,
	actionButton,
}: {
	cardData: BaseMovieTV;
	actionButton: {
		icon: (props: IconBaseProps) => JSX.Element;
		lable: string;
		id: number;
		isActive: boolean;
	}[];
}) => {
	const isMovie = isMovieData(cardData);

	const {
		fetcher: favouriteAndWatchlistMediaFetcher,
		data: favouriteMediaData,
		fetcherState: favouriteAndWatchlistMediaFetchState,
	} = useCustomFetcher<TBaseApiResponse | undefined>(undefined);

	const handleFavorite = () => {
		const payload: TBaseAction = {
			'x-type': 'favorite',
			media_type: isMovie ? 'movie' : 'tv',
			media_id: cardData.id,
			favorite: !cardData.isFavourite,
		};

		favouriteAndWatchlistMediaFetcher.submit(payload, {
			action: '/api/remote/action',
			method: 'POST',
		});
	};

	const handleWatchlist = () => {
		const payload: TBaseAction = {
			'x-type': 'watchlist',
			media_type: isMovie ? 'movie' : 'tv',
			media_id: cardData.id,
			watchlist: !cardData.isWatchListed,
		};

		favouriteAndWatchlistMediaFetcher.submit(payload, {
			action: '/api/remote/action',
			method: 'POST',
		});
	};
	return (
		<div
			key="actions"
			className="h-full w-full grid-cols-2 py-2 max-md:grid max-md:content-between max-md:justify-between max-md:px-3 md:flex md:gap-3"
		>
			{actionButton.map(m => (
				<div key={m.id} className="flex items-center gap-2 text-gray-500">
					<div
						className={twMerge(
							`flex h-8 w-8 items-center justify-center rounded-full border border-gray-300`,
							m.isActive && 'bg-gray-500 text-white'
						)}
						onClick={() => {
							if (favouriteAndWatchlistMediaFetchState == 'idle') {
								if (m.id == 2) {
									handleFavorite();
								} else if (m.id == 3) {
									handleWatchlist();
								}
							}
						}}
					>
						<m.icon />
					</div>
					{m.lable} {m.isActive}
				</div>
			))}
		</div>
	);
};
