import React from 'react';
import ProfileMediaCard from '~/components/profileMediaCard';
import { GetFavoritesMedia, GetUserDetails, GetWatchlistMedia } from '~/lib/api';
import { TMovieTV } from '~/tyoes';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';
import { Route } from '../../../../.react-router/types/app/routes/profile/watchlist/+types/MovieWatchlist';

export async function loaderAPI(request: Request) {
	const cookieSession = await getCookieSessionFromHeader(request);

	const user = await GetUserDetails(cookieSession);
	if (!user.data) {
		return;
	}

	const res = await GetWatchlistMedia(cookieSession, 'movies', user.data.id);
	const usersFavouriteMovie = await GetFavoritesMedia(
		cookieSession,
		'movies',
		user.data.id
	);

	if (usersFavouriteMovie.data == undefined || res.data == undefined) {
		return;
	}

	// for (const movie of res.data.results) {
	// 	movie.isFavourite = true;
	// }

	for (const movie of res.data.results) {
		movie.isWatchListed = true;
		const match = usersFavouriteMovie.data.results.find(
			rco => rco.id === movie.id
		);
		if (match) {
			movie.isFavourite = true;
		}
	}

	// usersFavouriteMovie.data.results.forEach(fav => {
	// 	const match = res.data.results.find(rco => rco.id === fav.id);
	// 	if (match) {
	// 		match.isFavourite = true;
	// 	}
	// });

	return res.data;
}

export async function loader({ request }: Route.LoaderArgs) {
	return await loaderAPI(request);
}

const MovieWatchList = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <MovieWatchlistComponent movieData={loaderData} />;
};

export default MovieWatchList;

interface MovieWatchlistComponentProps {
	movieData: TMovieTV;
}

export const MovieWatchlistComponent = ({
	movieData,
}: MovieWatchlistComponentProps) => (
	<div className="flex h-full w-full flex-col gap-4 px-5">
		{movieData?.results.map(m => <ProfileMediaCard key={m.id} cardData={m} />)}
	</div>
);
