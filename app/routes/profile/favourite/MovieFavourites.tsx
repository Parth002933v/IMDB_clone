import React from 'react';
import { GetFavoritesMedia, GetUserDetails, GetWatchlistMedia } from '~/lib/api';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';
import { Route } from '../../../../.react-router/types/app/routes/profile/favourite/+types/MovieFavourites';
import { TMovieTV } from '~/tyoes';
import ProfileMediaCard from '~/components/profileMediaCard';

export async function loaderAPI(request: Request) {
	const cookieSession = await getCookieSessionFromHeader(request);

	const user = await GetUserDetails(cookieSession);
	if (!user.data) {
		return;
	}

	const res = await GetFavoritesMedia(cookieSession, 'movies', user.data.id);
	const userWatchlistMovies = await GetWatchlistMedia(
		cookieSession,
		'movies',
		user.data.id
	);

	if (userWatchlistMovies.data == undefined || res.data == undefined) {
		return;
	}

	for (const movie of res.data.results) {
		movie.isFavourite = true;

		const match = userWatchlistMovies.data.results.find(
			rco => rco.id === movie.id
		);
		if (match) {
			movie.isWatchListed = true;
		}
	}

	return res.data;
}

export async function loader({ request }: Route.LoaderArgs) {
	return await loaderAPI(request);
}

const FavouriteMovie = ({ loaderData }: Route.ComponentProps) => {
	// console.log(loaderData);
	if (!loaderData) {
		return <>Invalid User</>;
	}
	return <FavouriteMoviesComponenet favouriteMovieData={loaderData} />;
};

export default FavouriteMovie;

interface FavouriteMoviesComponenetProps {
	favouriteMovieData: TMovieTV;
}

export const FavouriteMoviesComponenet = ({
	favouriteMovieData,
}: FavouriteMoviesComponenetProps) => {
	return (
		<div className="flex h-full w-full flex-col gap-4 px-5">
			{favouriteMovieData?.results.map(m => (
				<ProfileMediaCard key={m.id} cardData={m} />
			))}
		</div>
	);
};
