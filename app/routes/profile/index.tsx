import React from 'react';
import { MovieRecommendationComponent } from '~/routes/profile/recommendation/MovieRecommendation';
import { Route } from '../../../.react-router/types/app/routes/profile/recommendation/+types/MovieRecommendation';

const Index = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <MovieRecommendationComponent movieData={loaderData} />;
};

export default Index;
