import React from 'react';
import { Route } from '../../../.react-router/types/app/routes/detail/+types/detail_movie';
import { GetMovieTVById } from '~/lib/api';
import { filterCrewByJobs } from '~/lib/utils';
import { data, useOutletContext } from 'react-router';
import DetailBanner from '~/components/movie_tv_detail/detailBanner';
import CastCrew from '~/components/movie_tv_detail/CastCrews';
import WatchProvider from '~/components/movie_tv_detail/watchProvider';
import { TProfile } from '~/tyoes';

export async function loader({ params }: Route.LoaderArgs) {
	// console.log('mediaDeatl', params);
	// if (!(params.mediaType === 'tv' || params.mediaType === 'movie')) {
	// 	throw data('not page found', { status: 404 });
	// }

	const MovieId = params.id.split('-')[0];

	const movieDetail = await GetMovieTVById(MovieId, 'movie');

	// const movie = movieDetail.data;
	// const isMovie = isMovieDetail(movie);
	// if(isMovie == true){

	// console.log(Movie.release_dates.results.find((f)=>f.iso_3166_1 =="IN")?.release_dates[0].certification);
	// }
	// const CastCrew = await GetCastCrewByMovieId(MovieId, 'movie');

	// const pagginatedCast = CastCrew.data.cast.slice(0, 10);
	const pagginatedCast = movieDetail.data.credits.cast.slice(0, 10);
	const importantCrews = filterCrewByJobs(movieDetail.data.credits.crew);

	// const watchProvider = await GetWatchProvider('movie', MovieId);
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
		watchProvider: movieDetail.data['watch/providers'],
		colorPalette: '',
	});
}

const MovieDetail = ({ loaderData }: Route.ComponentProps) => {
	const {
		movieDetail,
		watchProvider,
		importantCrews,
		paginatedCast,
		colorPalette,
	} = loaderData;
	return (
		<div className="h-full w-full">
			<DetailBanner
				data={movieDetail}
				importantCrews={importantCrews}
				provider={watchProvider.results.IN?.flatrate[0]}
			/>

			<CastCrew paginatedCast={paginatedCast} />

			{Object.keys(watchProvider.results).length === 0 ||
			watchProvider.results.IN == undefined ? (
				<></>
			) : (
				<WatchProvider provider={watchProvider.results.IN.flatrate[0]} />
			)}
		</div>
	);
};

export default MovieDetail;
