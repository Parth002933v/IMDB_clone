import React from 'react';
import ProfileMediaCard from '~/components/profileMediaCard';
import { Route } from '../../../../.react-router/types/app/routes/profile/watchlist/+types/TVWatchlist';
import { GetFavoritesMedia, GetUserDetails, GetWatchlistMedia } from '~/lib/api';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await getCookieSessionFromHeader(request);

	const user = await GetUserDetails(cookieSession);
	if (!user.data) {
		return;
	}

	const res = await GetWatchlistMedia(cookieSession, 'tv', user.data.id);
	const usersFavouriteTV = await GetFavoritesMedia(
		cookieSession,
		'tv',
		user.data.id
	);

	if (usersFavouriteTV.data == undefined || res.data == undefined) {
		return;
	}

	// for (const movie of res.data.results) {
	// 	movie.isFavourite = true;
	// }

	for (const tv of res.data.results) {
		tv.isWatchListed = true;
		const match = usersFavouriteTV.data.results.find(rco => rco.id === tv.id);
		if (match) {
			tv.isFavourite = true;
		}
	}

	return res.data;
}

const TVWatchlist = ({ loaderData }: Route.ComponentProps) => {
	return (
		<div className="flex h-full w-full flex-col gap-4 px-5">
			{loaderData?.results.map(m => (
				<ProfileMediaCard key={m.id} cardData={m} />
			))}
		</div>
	);
};

export default TVWatchlist;
