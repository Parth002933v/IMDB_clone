import React from 'react';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/MovieRecommendation';

export function loader({ params }: Route.LoaderArgs) {}

const MovieRecommendatin = () => {
	return <MovieRecommendationComponent />;
};

export default MovieRecommendatin;

export const MovieRecommendationComponent = () => (
	<div className="h-full w-full px-5">
		<div>Movi</div>
	</div>
);
