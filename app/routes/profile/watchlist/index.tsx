import React from 'react';

import { TMovieTV } from '~/tyoes';
import { loaderAPI, MovieWatchlistComponent } from './MovieWatchlist';
import { Route } from '../../../../.react-router/types/app/routes/profile/watchlist/+types';

export async function loader(l: Route.LoaderArgs): Promise<TMovieTV | undefined> {
	return await loaderAPI(l.request);
}

const Index = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <MovieWatchlistComponent movieData={loaderData} />;
};

export default Index;
