import React from 'react';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/MovieRecommendation';
import ProfileMediaCard from '~/components/profileMediaCard';
import {
	GetFavoritesMedia,
	GetRecommendedMedia,
	GetUserDetails,
	GetWatchlistMedia,
} from '~/lib/api';
import { TMovieTV } from '~/tyoes';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';

export async function loaderAPI(request: Request) {
	const recommendedMovie = await GetRecommendedMedia('movie');

	const cookieSession = await getCookieSessionFromHeader(request);
	const profileDetail = await GetUserDetails(cookieSession);
	// console.log('in movie recommendation ',profileDetail.data,'in movieRcomendation');

	if (profileDetail.data === undefined) {
		return;
	}

	// console.log(profileDetail);
	const usersFavouriteMovie = await GetFavoritesMedia(
		cookieSession,
		'movies',
		profileDetail.data.id
	);

	const userWatchlistMovies = await GetWatchlistMedia(
		cookieSession,
		'movies',
		profileDetail.data.id
	);

	if (
		usersFavouriteMovie.data === undefined ||
		userWatchlistMovies.data === undefined
	) {
		return;
	}

	usersFavouriteMovie.data.results.forEach(fav => {
		const match = recommendedMovie.data.results.find(rco => rco.id === fav.id);
		if (match) {
			match.isFavourite = true;
		}
	});
	userWatchlistMovies.data.results.forEach(wal => {
		const match = recommendedMovie.data.results.find(rco => rco.id === wal.id);
		if (match) {
			match.isWatchListed = true;
		}
	});

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
}: MovieRecommendationComponentProps) => (
	<div className="flex h-full w-full flex-col gap-4 px-5">
		{movieData?.results.map(m => <ProfileMediaCard key={m.id} cardData={m} />)}
	</div>
);
