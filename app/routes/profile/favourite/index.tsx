import React from 'react';
import { FavouriteMoviesComponenet } from '~/routes/profile/favourite/MovieFavourites';
import { Route } from '../../../../.react-router/types/app/routes/profile/favourite/+types';
import {loaderAPI} from "./MovieFavourites"
import { TMovieTV } from '~/tyoes';
//
export async function loader(l: Route.LoaderArgs): Promise<TMovieTV | undefined> {
	// console.log('profile index loade');
	return await loaderAPI(l.request);
}

const Index = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <FavouriteMoviesComponenet favouriteMovieData={loaderData}/>;
};

export default Index;
