import React from 'react';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/MovieRecommendation';
import RecommendationCard from '~/components/recomendation/reomendationCard';
import { GetFavoritesMedia, GetRecommendedMedia, GetUserDetails } from '~/lib/api';
import { TMovieTV } from '~/tyoes';

export async function loader({}: Route.LoaderArgs) {
	const recommendedMovie = await GetRecommendedMedia('movie');

	const profileDetail = await GetUserDetails();

	if (profileDetail.data === undefined) {
		return;
	}
	console.log(profileDetail);
	const usersFavouriteMovie = await GetFavoritesMedia(
		'movies',
		profileDetail.data.id
	);

	usersFavouriteMovie.data.results.forEach(fav => {
		const match = recommendedMovie.data.results.find(rco => rco.id === fav.id);
		if (match) {
			match.isFavourite = true;
		}
	});

	console.log('in laoder');
	return recommendedMovie.data;
}

export async function action({ request, params, context }: Route.ActionArgs) {
	console.log('in action');
	// const formData = new URLSearchParams(await request.text());

	// let payload: TBaseAction;
	// const formData = await request.formData();
	//
	// const media_type = formData.get('media_type') as 'movie' | 'tv';
	// const media_id = parseInt((formData.get('media_id') as string) || '0', 10);
	// const favorite = formData.has('favorite')
	// 	? formData.get('favorite') === 'true'
	// 	: undefined;
	// const watchlist = formData.has('watchlist')
	// 	? formData.get('watchlist') === 'true'
	// 	: undefined;
	//
	// if (favorite) {
	// 	payload = {
	// 		media_type: media_type,
	// 		media_id: media_id,
	// 		favorite: favorite,
	// 	};
	// } else if (watchlist) {
	// 	payload = {
	// 		media_type: media_type,
	// 		media_id: media_id,
	// 		watchlist: watchlist,
	//
	// 	};
	// 	console.log(formData.get('favorite'));
	// 	console.log(payload);
	// }
}

const MovieRecommendation = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	return <MovieRecommendationComponent movieData={loaderData} />;
};

export default MovieRecommendation;

interface MovieRecommendationComponentProps {
	movieData: TMovieTV;
}

export const MovieRecommendationComponent = ({
	movieData,
}: MovieRecommendationComponentProps) => (
	<div className="flex h-full w-full flex-col gap-4 px-5">
		{/*{data && ({*/}
		{movieData?.results.map(m => <RecommendationCard key={m.id} cardData={m} />)}

		{/*})}*/}
	</div>
);
