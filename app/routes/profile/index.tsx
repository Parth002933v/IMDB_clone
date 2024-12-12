import React from 'react';
import { MovieRecommendationComponent } from '~/routes/profile/recommendation/MovieRecommendation';

import { loaderAPI as movieRecommendationLoader } from './recommendation/MovieRecommendation';
import { TMovieTV } from '~/tyoes';
import { Route } from '../../../.react-router/types/app/routes/profile/+types';

export async function loader(l: Route.LoaderArgs): Promise<TMovieTV | undefined> {
	// console.log('profile index loade');
	return await movieRecommendationLoader(l.request);
}

const Index = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <MovieRecommendationComponent movieData={loaderData} />;
};

export default Index;
