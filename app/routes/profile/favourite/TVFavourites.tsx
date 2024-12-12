import React from 'react';
import { GetFavoritesMedia, GetUserDetails, GetWatchlistMedia } from '~/lib/api';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';
import { TMovieTV } from '~/tyoes';
import ProfileMediaCard from '~/components/profileMediaCard';
import { Route } from '../../../../.react-router/types/app/routes/profile/favourite/+types/TVFavourites';

export async function loaderAPI(request: Request) {
	const cookieSession = await getCookieSessionFromHeader(request);

	const user = await GetUserDetails(cookieSession);
	if (!user.data) {
		return;
	}

	const res = await GetFavoritesMedia(cookieSession, 'tv', user.data.id);

	const userWatchlistTV = await GetWatchlistMedia(
		cookieSession,
		'tv',
		user.data.id
	);

	if (userWatchlistTV.data == undefined || res.data == undefined) {
		return;
	}

	for (const tv of res.data.results) {
		tv.isFavourite = true;

		const match = userWatchlistTV.data.results.find(rco => rco.id === tv.id);
		if (match) {
			tv.isWatchListed = true;
		}
	}

	return res.data;
}

export async function loader({ request }: Route.LoaderArgs) {
	return await loaderAPI(request);
}

const FavouriteTV = ({ loaderData }: Route.ComponentProps) => {
	// console.log(loaderData);
	if (!loaderData) {
		return <>Invalid User</>;
	}
	return <FavouriteTVComponenet favouriteMovieData={loaderData} />;
};

export default FavouriteTV;

interface FavouriteTVComponenetProps {
	favouriteMovieData: TMovieTV;
}

export const FavouriteTVComponenet = ({
	favouriteMovieData,
}: FavouriteTVComponenetProps) => {
	return (
		<div className="flex h-full w-full flex-col gap-4 px-5">
			{favouriteMovieData?.results.map(m => (
				<ProfileMediaCard key={m.id} cardData={m} />
			))}
		</div>
	);
};
