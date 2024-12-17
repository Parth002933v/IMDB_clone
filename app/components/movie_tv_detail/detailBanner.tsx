import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
	BaseMediaDetails,
	isMovieDetail,
	providerData,
	TBaseAction,
	TBaseApiResponse,
	TProfile,
} from '~/tyoes';
import RoundedProgressBar from '~/components/prgressbar';
import { convertMinutes } from '~/lib/utils';
import { FaBookmark, FaList, FaPlay } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { Popover } from 'flowbite-react';
import { useNavigate, useOutletContext } from 'react-router';
import useCustomFetcher from '~/hooks/useCustomFetcher';

interface DetailBannerProps {
	detailMediaData: BaseMediaDetails;
	importantCrews: { name: string; jobs: string[] }[];
	provider?: providerData;
}

const DetailBanner = ({
	detailMediaData: media,
	importantCrews,
	provider,
}: DetailBannerProps) => {
	const user: TProfile | undefined = useOutletContext();
	const navigate = useNavigate();
	// console.log(provider);
	const isMovie = isMovieDetail(media);

	// if(!isMovie){
	// 	console.log(media.content_ratings.results[0].rating);
	// }
	const runtime = isMovie
		? `${convertMinutes(media.runtime).hours}h ${convertMinutes(media.runtime).minutes}m`
		: null;
	// console.log(`url('https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces${media.backdrop_path}')`);
	const actionButtons = [
		{
			id: 1,
			icons: FaList,
			lable: 'add to ist',
			no_login_lable: 'Login to create and edit custom lists',
			isActive: false,
		},
		{
			id: 2,
			icons: MdFavorite,
			lable: 'Mark as Favorite',
			no_login_lable: 'Login to add this movie to your favorite list',
			isActive: media.isFavourite || false,
		},
		{
			id: 3,
			icons: FaBookmark,
			lable: 'Add to your watchlist',
			no_login_lable: 'Login to add this movie to your watchlist',
			isActive: media.isWatchListed || false,
		},
	];

	const {
		fetcher: favouriteAndWatchlistMediaFetcher,
		data: favouriteMediaData,
		fetcherState: favouriteAndWatchlistMediaFetchState,
	} = useCustomFetcher<TBaseApiResponse | undefined>(undefined);

	const handleFavorite = () => {
		const payload: TBaseAction = {
			'x-type': 'favorite',
			media_type: isMovie ? 'movie' : 'tv',
			media_id: media.id,
			// favorite : media.
			favorite: !media.isFavourite,
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
			media_id: media.id,
			watchlist: !media.isWatchListed,
		};

		favouriteAndWatchlistMediaFetcher.submit(payload, {
			action: '/api/remote/action',
			method: 'POST',
		});
	};

	return (
		<div className={twMerge(`relative`)}>
			<div key="mobile" className="h-full w-full md:hidden">
				<div className="relative h-[calc(100vw/2.222222)] w-full overflow-hidden">
					<div
						style={{
							backgroundImage: `url("https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces${media.backdrop_path}")`,
						}}
						className={twMerge(
							'h-full w-full min-w-full bg-cover bg-no-repeat',
							'bg-[calc((((100vw/2.222222)-20px)/1.5)/2)_0]'
						)}
					>
						<div
							key="gradient"
							className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(10.5,31.5,52.5,1)_20%,rgba(10.5,31.5,52.5,0)_50%)]"
						/>
						<div
							key="left_shadow"
							className="absolute inset-0 bg-slate-700 opacity-50"
						/>
						{/*<div className="w-[calc(((100vw/2.222222) - 40px)/1.5)] min-w-[calc(((100vw/2.222222) - 40px)/1.5)] h-[calc((100vw/2.222222) - 40px)] min-h-[calc((100vw/2.222222) - 40px)] absolute left-5 top-4 z-[4] overflow-hidden">*/}

						<div className="absolute bottom-0 left-5 top-0  my-auto h-[80%] overflow-hidden">
							<img
								className="hidden h-full min-h-full w-full min-w-full rounded-md max-md:block"
								src={`https://media.themoviedb.org/t/p/w300_and_h450_face/${media.poster_path}`}
								// srcSet={`https://media.themoviedb.org/t/p/w116_and_h174_face/${movieDetail.poster_path} 1x, https://media.themoviedb.org/t/p/w220_and_h330_face/${movieDetail.poster_path} 2x`}
								alt={
									isMovie ? `${media.title} poster` : `${media.name} poster`
								}
							/>

							{/*<img*/}
							{/*	className="hidden h-full min-h-full w-full min-w-full md:block"*/}
							{/*	src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${media.poster_path}`}*/}
							{/*	// srcSet={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path} 1x, https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movieDetail.poster_path} 2x`}*/}
							{/*	alt={*/}
							{/*		isMovie ? `${media.title} poster` : `${media.name} poster`*/}
							{/*	}*/}
							{/*/>*/}
						</div>
					</div>
				</div>

				<div className="mt-3 text-center text-2xl font-semibold">
					{isMovie ? media.title : media.name}
					<span className="pl-1 text-xl text-gray-500">
						(
						<>
							{isMovie
								? media.release_date.split('-')[0]
								: media.first_air_date.split('-')[0]}
						</>
						)
					</span>
				</div>

				<div className="mx-auto flex items-center justify-between py-3 max-md:px-10">
					<div className="flex items-center gap-2">
						<div className="h-12 w-12">
							<RoundedProgressBar
								progress={Math.trunc(media.vote_average * 10)}
							/>
						</div>
						<span className="font-semibold">User Score</span>
					</div>

					<hr className="h-5 border-l border-gray-300" />

					<div className="font-bold">What is your Vibe?</div>
				</div>

				<div className="flex w-full items-center justify-center gap-2 border-b border-t bg-gray-500 py-2">
					<div className="border border-[#FFFFFF99] p-0.5 text-sm text-[#FFFFFF99]">
						PG-13
					</div>
					<div className="text-center text-sm text-white">
						{isMovie && (
							<>
								{media.release_date} ({media.origin_country}) • {runtime} •
							</>
						)}
						Play Trailer
						<br />
						{media.genres.map(r => r.name).join(', ')}
					</div>
				</div>

				<div className="px-5 pt-3">
					<div className="font-medium italic text-white">{media.tagline}</div>
					<div className="text-xl font-semibold">Overview</div>
					<div className="mt-2 text-sm font-normal">{media.overview}</div>

					<hr className="my- my-4 flex h-0.5 w-full" />
					<div className="grid w-full grid-cols-2 gap-3 pb-3">
						{importantCrews.map((d, i) => (
							<div key={d.name} className="w-fit">
								<div className="font-bold">{d.name}</div>
								<div className="text-xs">{d.jobs.join(', ')}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/*//==========================================================*/}
			<div
				className={twMerge(
					'relative flex h-[35rem] w-full min-w-full overflow-hidden',
					'max-md:hidden'
				)}
			>
				<div
					key="desktop"
					className={twMerge(
						'h-full w-full bg-cover bg-[calc((((100vw/2.222222)-20px)/1.5)/2)_0] bg-no-repeat'
					)}
					// className="flex h-[58vh] w-full items-center bg-gray-600"
					style={{
						backgroundImage: `url("https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces${media.backdrop_path}")`,
					}}
				></div>

				<div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(10.5,31.5,52.5,1)_20%,rgba(10.5,31.5,52.5,0)_50%)]" />
				<div className="absolute inset-0 bg-slate-500 opacity-70" />
				<div className="absolute inset-0 mx-auto my-auto flex h-full w-full max-w-[1350px] items-center justify-center gap-7 px-5">
					<div
						id="poster"
						// className="flex h-[33rem] w-[19rem] flex-col overflow-hidden rounded-md "
						// className=" flex w-[calc(((100vw/2.222222) - 40px)/1.5)] min-w-[calc(((100vw/2.222222) - 40px)/1.5)] h-[calc((100vw/2.222222) - 80px)] min-h-[calc((100vw/2.222222) - 40px)] flex-col overflow-hidden rounded-md"

						className="flex h-[39rem] w-[289px] flex-none flex-col justify-center overflow-hidden"
					>
						<div className="h-[70%] w-full overflow-hidden rounded-tl-md rounded-tr-md">
							<img
								src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${media.poster_path}`}
								className="h-full w-full object-fill"
								alt=""
							/>
						</div>

						<div className="flex h-[10%] items-center justify-center rounded-bl-md rounded-br-md bg-[#032541]">
							<div>
								<div className="flex w-full items-center justify-center gap-3">
									<div className="h-9 w-9 overflow-hidden rounded-md">
										<img
											src={`https://media.themoviedb.org/t/p/original/${provider && provider.logo_path}`}
											alt="provdier"
										/>
									</div>
									<div>
										<div className="text-sm leading-3 text-gray-300">
											Now Streaming
										</div>
										<div className="text-sm font-semibold text-white">
											Watch Now
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="detail" className="flex-auto text-white">
						<div className="mt-3 text-3xl font-bold">
							{isMovie ? media.title : media.name}
							<span className="pl-1 font-normal text-gray-300">
								(
								<>
									{isMovie
										? media.release_date.split('-')[0]
										: media.first_air_date.split('-')[0]}
								</>
								)
							</span>
						</div>

						<div className="mb-2 flex items-center gap-2">
							<div className="border border-[#FFFFFF99] p-0.5 text-sm text-[#FFFFFF99]">
								{/*{isMovie ?media.release_dates.results.find((f)=>f.iso_3166_1 =="IN")?.release_dates[0].certification : "-"}*/}
								{isMovie
									? media.release_dates.results.find(
											f => f.iso_3166_1 == 'IN'
										)?.release_dates[0].certification
									: media.content_ratings.results.find(
											f => f.iso_3166_1 == 'IN'
										)?.rating}
							</div>
							<div className="whitespace-nowrap text-nowrap text-center text-sm text-white">
								{isMovie && (
									<>
										{media.release_date} ({media.origin_country}) •{' '}
									</>
								)}
								{media.genres.map(r => r.name).join(', ')} • {runtime}
							</div>
						</div>

						<div className="mx-auto flex items-center gap-3 py-3 max-md:px-10">
							<div className="flex items-center gap-2">
								<div className="h-16 w-16">
									<RoundedProgressBar
										progress={Math.trunc(media.vote_average * 10)}
									/>
								</div>
								<span className="font-semibold">
									User <br /> Score
								</span>
							</div>

							<div className="rounded-full bg-[#032541] px-3 py-2 font-semibold text-white">
								What is your Vibe?
							</div>
						</div>

						<div className="mb-6 flex items-center gap-5 text-white">
							{actionButtons.map(m => (
								<Popover
									className="border-none bg-[#032541]"
									key={m.lable}
									content={
										<div
											className={twMerge(
												`bg-[#032541] px-2 py-2 text-xs`
											)}
										>
											{user ? m.lable : m.no_login_lable}
										</div>
									}
									trigger={'hover'}
								>
									<div
										onClick={() => {
											if (
												favouriteAndWatchlistMediaFetchState == 'idle' &&
												user
											) {
												if (m.id == 2) {
													handleFavorite();
												} else if (m.id == 3) {
													handleWatchlist();
												}
											} else if (!user) {
												navigate('/login', { viewTransition: true });
											}
										}}
										className={twMerge(
											`flex h-12 w-12 cursor-default items-center justify-center rounded-full bg-[#032541]`,
											user && 'cursor-pointer'
										)}
									>
										{
											<m.icons
												className={twMerge(
													m.isActive && 'text-pink-500',
													'cursor-pointer'
												)}
											/>
										}
									</div>
								</Popover>
							))}
							{/*<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#032541]">*/}
							{/*	<FaList />*/}
							{/*</div>*/}
							{/*<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#032541]">*/}
							{/*	<MdFavorite />*/}
							{/*</div>*/}
							{/*<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#032541]">*/}
							{/*	<FaBookmark />*/}
							{/*</div>*/}
							<div className="flex items-center gap-2 text-sm font-semibold">
								<FaPlay />
								Play Trailer
							</div>
						</div>

						<div>
							<div className="font-medium italic text-gray-100">
								{media.tagline}
							</div>
							<div className="text-xl font-semibold">Overview</div>
							<div className="mt-2 text-sm font-normal">{media.overview}</div>

							<div className="my-4 grid w-full grid-cols-3 gap-3">
								{importantCrews.map((d, i) => (
									<div key={d.name} className="w-fit">
										<div className="font-bold">{d.name}</div>
										<div className="text-xs">{d.jobs.join(', ')}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailBanner;
