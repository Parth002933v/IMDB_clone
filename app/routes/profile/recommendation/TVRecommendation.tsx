import React from 'react';
import ProfileMediaCard from '~/components/profileMediaCard';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/TVRecommendation';
import { GetFavoritesMedia, GetRecommendedMedia, GetUserDetails, GetWatchlistMedia } from '~/lib/api';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';

export async function loader({ request }: Route.LoaderArgs) {
	const recommendedMovie = await GetRecommendedMedia('tv');

	const cookieSesstion = await getCookieSessionFromHeader(request);

	const profileDetail = await GetUserDetails(cookieSesstion);
	if (profileDetail.data === undefined) {
		return;
	}

	const usersFavouriteMovie = await GetFavoritesMedia(
		cookieSesstion,
		'tv',
		profileDetail.data.id
	);
	const userWatchlistMovies = await GetWatchlistMedia(
		cookieSesstion,
		'tv',
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

const TVRecommendation = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}
	return (
		<div className="flex h-full w-full flex-col gap-4 px-5">
			{loaderData.results.map(m => (
				<ProfileMediaCard key={m.id} cardData={m} />
			))}
		</div>
	);
};

export default TVRecommendation;
