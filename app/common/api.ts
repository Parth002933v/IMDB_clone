import {
	FreeToWatchGroupType,
	PopularMovieGroupType,
	TrendingMovieGroupType,
} from '~/tyoes';

export const GetTrendingMovies = (by: TrendingMovieGroupType) => {
	// const baseURL = 'https://api.themoviedb.org/3/discover/movie';
	// const params = new URLSearchParams();

	return fetch(`https://api.themoviedb.org/3/trending/movie/${by}?language=en-US`, {
		cache: 'force-cache',
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};

export const GetPopularMovies = (by: PopularMovieGroupType) => {
	const baseURL = 'https://api.themoviedb.org/3/discover/movie';
	const params = new URLSearchParams();

	switch (by) {
		case 'streaming':
			params.set('with_watch_monetization_types', 'flatrate');
			break;
		case 'on-tv':
			params.set('with_release_type', '4');
			break;
		case 'for-rent':
			params.set('with_watch_monetization_types', 'rent');
			break;
		case 'in-theatres':
			params.set('with_release_type', '3');
			break;
		default:
			params.set('with_watch_monetization_types', 'flatrate');
	}

	params.set('watch_region', 'IN');
	params.set('language', 'en-US');
	return fetch(`${baseURL}?${params}`, {
		cache: 'force-cache',
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

	return fetch(`${baseUrl}?${params.toString()}`, {
		cache: 'force-cache',
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};
