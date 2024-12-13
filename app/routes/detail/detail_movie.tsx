import React from 'react';
import { Route } from '../../../.react-router/types/app/routes/detail/+types/detail_movie';
import {
	GetFavoritesMedia,
	GetMovieTVById,
	GetUserDetails,
	GetWatchlistMedia,
} from '~/lib/api';
import { filterCrewByJobs, getMaxDisplayPriorityItem } from '~/lib/utils';
import { data } from 'react-router';
import DetailBanner from '~/components/movie_tv_detail/detailBanner';
import CastCrew from '~/components/movie_tv_detail/CastCrews';
import WatchProvider from '~/components/movie_tv_detail/watchProvider';
import { isMovieDetail } from '~/tyoes';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';

export async function loader({ params, request }: Route.LoaderArgs) {
	// console.log('mediaDeatl', params);
	// if (!(params.mediaType === 'tv' || params.mediaType === 'movie')) {
	// 	throw data('not page found', { status: 404 });
	// }

	const cookieSession = await getCookieSessionFromHeader(request);
	const profileDetail = await GetUserDetails(cookieSession);

	const MovieId = params.id.split('-')[0];

	const movieDetail = await GetMovieTVById(MovieId, 'movie');
	const m = movieDetail.data;
	const isMovie = isMovieDetail(m);
	// const movie = movieDetail.data;
	// const isMovie = isMovieDetail(movie);
	// if(isMovie == true){

	// console.log(Movie.release_dates.results.find((f)=>f.iso_3166_1 =="IN")?.release_dates[0].certification);
	// }
	// const CastCrew = await GetCastCrewByMovieId(MovieId, 'movie');

	// const pagginatedCast = CastCrew.data.cast.slice(0, 10);
	const pagginatedCast = isMovie
		? m.credits.cast.slice(0, 10)
		: m.aggregate_credits.cast.slice(0, 10);
	const importantCrews = filterCrewByJobs(
		isMovie ? m.credits.crew : m.aggregate_credits.crew
	);

	if (profileDetail.data) {
		const usersFavouriteMovie = await GetFavoritesMedia(
			cookieSession,
			'movies',
			profileDetail.data.id
		);

		const userWatchlistMovies = await GetWatchlistMedia(
			cookieSession,
			'movies',
			profileDetail.data.id
		);

		if (
			usersFavouriteMovie.data === undefined ||
			userWatchlistMovies.data === undefined
		) {

			return data({
				movieDetail: movieDetail.data,
				paginatedCast: pagginatedCast,
				importantCrews: importantCrews,
				watchProvider: movieDetail.data['watch/providers'],
				colorPalette: '',
			});

		}

		usersFavouriteMovie.data.results.forEach(fav => {
			// const match = m.results.find(rco => rco.id === fav.id);
			const match = m.id === fav.id;
			if (match) {
				m.isFavourite = true;
			}
		});
		userWatchlistMovies.data.results.forEach(wal => {
			const match = m.id === wal.id;
			if (match) {
				m.isWatchListed = true;
			}
		});
	}
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
	const { movieDetail, watchProvider, importantCrews, paginatedCast } = loaderData;
	// console.log(loaderData.watchProvider.results.IN);
	const item = getMaxDisplayPriorityItem(
		watchProvider.results.IN || watchProvider.results.US!
	);

	return (
		<div className="h-full w-full">
			<DetailBanner
				detailMediaData={movieDetail}
				importantCrews={importantCrews}
				provider={item == null ? undefined : item}
			/>

			<CastCrew paginatedCast={paginatedCast} />

			{Object.keys(watchProvider.results).length === 0 ||
			watchProvider.results.IN == undefined ? (
				<></>
			) : (
				<WatchProvider provider={item == null ? undefined : item} />
			)}
		</div>
	);
};

export default MovieDetail;
