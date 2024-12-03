import {
	BaseMediaDetails,
	FreeToWatchGroupType,
	PopularMovieGroupType,
	SearchMediaType,
	TCastCrew,
	TFreeToWatch,
	TMovieDetail,
	TMovieTV,
	TPopularMovie,
	TrendingMovieGroupType,
	TTrendingMovieTV,
} from '~/tyoes';
import axios from 'axios';

export const GetTrendingMovies = (by: TrendingMovieGroupType) => {
	return axios.get<TTrendingMovieTV>(
		`https://api.themoviedb.org/3/trending/all/${by}?language=en-US`,
		{
			timeout: 10000,
			timeoutErrorMessage: 'timeout',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
				'Content-Type': 'application/json',
			},
		}
	);
};

export const GetPopularMovies = (by: PopularMovieGroupType) => {
	let baseURL = 'https://api.themoviedb.org/3/discover/movie';
	const params = new URLSearchParams();

	switch (by) {
		case 'streaming':
			params.set('with_watch_monetization_types', 'flatrate');
			break;
		case 'on-tv':
			params.set('with_release_type', '6');
			break;
		case 'for-rent':
			params.set('with_watch_monetization_types', 'rent');
			break;
		case 'in-theatres':
			params.set('with_release_type', '2|3');
			break;
		default:
			params.set('with_watch_monetization_types', 'flatrate');
	}

	params.set('watch_region', 'IN');
	// params.set('language', 'en-US');
	return axios.get<TMovieTV>(`${baseURL}?${params}`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};

export const GetFreeShow = (by: FreeToWatchGroupType) => {
	const baseUrl = `https://api.themoviedb.org/3/discover/${by}`;

	const params = new URLSearchParams();
	params.set('with_watch_monetization_types', 'free');
	params.set('watch_region', 'IN');
	params.set('language', 'en-US');

	return axios.get<TMovieTV>(`${baseUrl}?${params.toString()}`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};

export const GetMovieTVById = (id: string, mediaType: 'movie' | 'tv') => {
	const baseUrl = `https://api.themoviedb.org/3/${mediaType}/${id}`;
	const param = new URLSearchParams();
	param.set('language', 'en-US');

	return axios.get<BaseMediaDetails>(`${baseUrl}?${param.toString()}`, {
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};

export const GetCastCrewByMovieId = (movieId: string, mediaType: 'movie' | 'tv') => {
	const baseUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}/credits`;
	const param = new URLSearchParams();
	param.set('language', 'en-US');

	return axios.get<TCastCrew>(`${baseUrl}?${param.toString()}`, {
		timeout: 1000,
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};

export const GetSearchResult = <T>(
	keyword: string,
	mediaType: SearchMediaType,
	page = '1'
) => {
	const baseURL = `https://api.themoviedb.org/3/search/${mediaType}`;

	const params = new URLSearchParams();
	params.set('language', 'en-US');
	params.set('include_adult', 'true');
	params.set('page', '1');
	params.set('query', keyword);
	params.set('page', page);

	return axios.get<T>(`${baseURL}?${params}`, {
		timeout: 1000,
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};
