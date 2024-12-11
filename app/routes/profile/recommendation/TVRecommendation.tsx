import React from 'react';
import RecommendationCard from '~/components/recomendation/reomendationCard';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/TVRecommendation';
import { GetFavoritesMedia, GetRecommendedMedia, GetUserDetails } from '~/lib/api';

export async function loader({}: Route.LoaderArgs) {
	const recommendedMovie = await GetRecommendedMedia('tv');

	const profileDetail = await GetUserDetails();
	if (profileDetail.data === undefined) {
		return;
	}

	const usersFavouriteMovie = await GetFavoritesMedia('tv', profileDetail!.data.id);

	usersFavouriteMovie.data.results.forEach(fav => {
		const match = recommendedMovie.data.results.find(rco => rco.id === fav.id);
		if (match) {
			match.isFavourite = true;
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
				<RecommendationCard key={m.id} cardData={m} />
			))}
		</div>
	);
};

export default TVRecommendation;
