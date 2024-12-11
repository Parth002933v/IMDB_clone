import React from 'react';
import { GetCastCrewByMovieId, GetMovieTVById, GetWatchProvider } from '~/lib/api';
import { filterCrewByJobs } from '~/lib/utils';
import { Route } from '../../../.react-router/types/app/routes/detail/+types/detail_tv';
import { data } from 'react-router';
import DetailBanner from '~/components/movie_tv_detail/detailBanner';
import CastCrew from '~/components/movie_tv_detail/CastCrews';
import WatchProvider from '~/components/movie_tv_detail/watchProvider';

export async function loader({ params }: Route.LoaderArgs) {
	// console.log('mediaDeatl', params);
	// if (!(params.mediaType === 'tv' || params.mediaType === 'movie')) {
	// 	throw data('not page found', { status: 404 });
	// }

	const MovieId = params.id.split('-')[0];

	const movieDetail = await GetMovieTVById(MovieId, 'tv');
	// const CastCrew = await GetCastCrewByMovieId(MovieId, 'tv');

	// const pagginatedCast = CastCrew.data.cast.slice(0, 10);
	const pagginatedCast = movieDetail.data.credits.cast.slice(0, 10);
	const importantCrews = filterCrewByJobs(movieDetail.data.credits.crew);

	// const watchProvider = await GetWatchProvider('tv', MovieId);
	// const fullImage = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.data.backdrop_path}`;

	// console.log(fullImage);
	//
	// // Function to extract the primary color from an image
	// async function getPrimaryColor(imageUrl: string) {
	// 	try {
	// 		// Get colors from image
	// 		const colors = await getColors(imageUrl);
	//
	// 		// Return the dominant color (first color in the array)
	// 		return {
	// 			primary: colors[4].rgb().join(','),
	// 			darken: colors[4].darken().rgb().join(','),
	// 		}; // returns RGB in the format: "r,g,b"
	// 	} catch (error) {
	// 		console.error('Error extracting primary color:', error);
	// 		return { primary: '255,255,255', darken: '0,0,0' }; // fallback to white if there's an error
	// 	}
	// }

	// const primaryColor = await getPrimaryColor(fullImage);

	return data({
		movieDetail: movieDetail.data,
		paginatedCast: pagginatedCast,
		importantCrews: importantCrews,
		watchProvider: movieDetail.data["watch/providers"],
		colorPalette: '',
	});
}

const TvDetail = ({ loaderData }: Route.ComponentProps) => {
	const {
		movieDetail,
		watchProvider,
		importantCrews,
		paginatedCast,
		colorPalette,
	} = loaderData;
	//
	// if (!isMovie) return <>is is not movie</>;
	//
	// const runtime = `${convertMinutes(movieDetail.runtime).hours}h ${convertMinutes(movieDetail.runtime).minutes}m`;
	return (
		<div className="h-full w-full">
			<DetailBanner
				detailMediaData={movieDetail}
				importantCrews={importantCrews}
				provider={watchProvider.results.IN?.flatrate[0]}
			/>

			<CastCrew paginatedCast={paginatedCast} />

			{Object.keys(watchProvider.results).length === 0 || watchProvider.results.IN == undefined ? (
				<></>
			) : (
				<WatchProvider provider={watchProvider.results.IN.flatrate[0]} />
			)}
		</div>
	);
};

export default TvDetail;
