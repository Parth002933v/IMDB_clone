import React, { useEffect, useState } from 'react';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/MovieRecommendation';
import ProfileMediaCard from '~/components/profileMediaCard';
import { GetRecommendedMedia } from '~/lib/api';
import { TMovieTV } from '~/tyoes';
import {
	getCookieSessionFromHeader,
	getUserFromRequest,
} from '~/lib/sessionStorage';
import useCustomFetcher from '~/hooks/useCustomFetcher';
import { addToFavouriteAndWatchlistFieldValue } from '~/lib/utils';

export async function loaderAPI(request: Request) {
	const recommendedMovie = await GetRecommendedMedia('movie');
	const cookieSession = await getCookieSessionFromHeader(request);
	const profileDetail = await getUserFromRequest(request);
	if (profileDetail === undefined) {
		return;
	}

	await addToFavouriteAndWatchlistFieldValue(
		recommendedMovie.data,
		cookieSession,
		profileDetail.id,
		'movies'
	);

	// console.log(profileDetail);
	// const usersFavouriteMovie = await GetFavoritesMedia(
	// 	cookieSession,
	// 	'movies',
	// 	profileDetail.id
	// );
	//
	// const userWatchlistMovies = await GetWatchlistMedia(
	// 	cookieSession,
	// 	'movies',
	// 	profileDetail.id
	// );
	// if (
	// 	usersFavouriteMovie.data === undefined ||
	// 	userWatchlistMovies.data === undefined
	// ) {
	// 	return;
	// }
	//
	// usersFavouriteMovie.data.results.forEach(fav => {
	// 	const match = recommendedMovie.data.results.find(rco => rco.id === fav.id);
	// 	if (match) {
	// 		match.isFavourite = true;
	// 	}
	// });
	// userWatchlistMovies.data.results.forEach(wal => {
	// 	const match = recommendedMovie.data.results.find(rco => rco.id === wal.id);
	// 	if (match) {
	// 		match.isWatchListed = true;
	// 	}
	// });

	return recommendedMovie.data;
}

export async function loader({ request }: Route.LoaderArgs) {
	return await loaderAPI(request);
}

const MovieRecommendation = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <MovieRecommendationComponent movieData={loaderData} />;
};

export default MovieRecommendation;

interface MovieRecommendationComponentProps {
	movieData: TMovieTV;
}

export const MovieRecommendationComponent = ({
	movieData,
}: MovieRecommendationComponentProps) => {

	const [movie, setMovie] = useState(movieData.results);

	const { fetcher, fetcherState, data } = useCustomFetcher<TMovieTV | undefined>(
		undefined
	);

	useEffect(() => {
		if (!data || !data.results) {
			return;
		}
		setMovie(prevState => [...prevState, ...data.results]);
		movieData.page = data.page;
	}, [data]);

	useEffect(() => {
		setMovie(prevState => [...movieData.results]);
	}, [movieData, movieData.results]);

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4 px-5">
			{movie?.map(m => <ProfileMediaCard key={m.id} cardData={m} />)}
			{movieData.page > 0 && movieData.page < movieData.total_pages && (
				<div
					onClick={() => {
						const params = new URLSearchParams();
						params.set('group-type', 'Recommendations');
						params.set('page', (movieData.page + 1).toString());
						params.set('media_type', 'movie');
						fetcher.load(`/api/remote/load-items?${params}`);
					}}
					className="w-full cursor-pointer rounded-lg bg-purple-500 py-3 text-center text-xl font-bold text-white"
				>
					{fetcherState === 'loading' ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18px"
							fill="#fff"
							className="ml-2 inline animate-spin"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
								data-original="#000000"
							/>
						</svg>
					) : (
						<>Load More</>
					)}
				</div>
			)}
		</div>
	);
};
