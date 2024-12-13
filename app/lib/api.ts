import {
	BaseMediaDetails,
	FreeToWatchGroupType,
	PopularMovieGroupType,
	SearchMediaType,
	TBaseAction,
	TBaseApiResponse,
	TCastCrew,
	TMovieTV,
	TProfile,
	TrendingMovieGroupType,
	TRequestToken,
	TSessionSuccess,
	TTrendingMovieTV,
	TWatchProvider,
} from '~/tyoes';
import { axios } from '~/lib/apiHandler';
import { BASE_URL } from '~/lib/constant';
import { AxiosResponse } from 'axios';
// 20429186

export const GetTrendingMedia = (
	mediaType: 'movie' | 'tv' | 'all',
	by: TrendingMovieGroupType
) => {
	const params = new URLSearchParams();
	params.set('sort_by', 'popularity.desc');
	params.set('watch_region', 'IN');
	params.set('language', 'hi-IN');

	return axios.get<TTrendingMovieTV>(
		`${BASE_URL}/trending/${mediaType}/${by}?${params}`
	);
};

export const GetPopularMovies = (by: PopularMovieGroupType) => {
	let baseURL = `${BASE_URL}/discover/movie`;
	const params = new URLSearchParams();

	params.set('watch_region', 'IN');
	params.set('language', 'hi-IN');
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

	// params.set('watch_region', 'IN');
	// params.set('language', 'en-US');
	return axios.get<TMovieTV>(`${baseURL}?${params}`);
};

export const GetFreeShow = (by: FreeToWatchGroupType) => {
	const baseUrl = `${BASE_URL}/discover/${by}`;

	const params = new URLSearchParams();
	params.set('with_watch_monetization_types', 'free');
	params.set('watch_region', 'IN');
	params.set('language', 'hi-IN');
	// params.set('watch_region', 'IN');
	// params.set('language', 'en-US');

	return axios.get<TMovieTV>(`${baseUrl}?${params.toString()}`);
};

export const GetMovieTVById = (id: string, mediaType: 'movie' | 'tv') => {
	const baseUrl = `${BASE_URL}/${mediaType}/${id}`;
	const param = new URLSearchParams();
	param.set('language', 'en-US');

	if (mediaType === 'movie') {
		param.set(
			'append_to_response',
			`${['release_dates', 'credits', 'watch/providers'].join(',')}`
		);
	} else if (mediaType === 'tv') {
		param.set(
			'append_to_response',
			`${['content_ratings', 'aggregate_credits', 'watch/providers'].join(',')}`
		);
	}

	return axios.get<BaseMediaDetails>(`${baseUrl}?${param.toString()}`);
};

export const GetCastCrewByMovieId = (movieId: string, mediaType: 'movie' | 'tv') => {
	const baseUrl = `${BASE_URL}/${mediaType}/${movieId}/${mediaType === 'tv' ? 'aggregate_credits' : 'credits'}`;
	const param = new URLSearchParams();
	// param.set('language', 'en-US');

	return axios.get<TCastCrew>(`${baseUrl}?${param.toString()}`);
};

export const GetSearchResult = <T>(
	keyword: string,
	mediaType: SearchMediaType,
	page = '1'
) => {
	const baseURL = `${BASE_URL}/search/${mediaType}`;

	const params = new URLSearchParams();
	// params.set('language', 'en-US');
	// params.set('include_adult', 'false');
	params.set('page', '1');
	params.set('query', keyword);
	params.set('page', page);

	return axios.get<T>(`${baseURL}?${params}`);
};

export const createRequestToken = () => {
	const baseURL = `${BASE_URL}/authentication/token/new`;
	return axios.get<TRequestToken>(baseURL);
};

export const login = (userName: string, password: string, requestToken: string) => {
	const baseURL = `${BASE_URL}/authentication/token/validate_with_login`;

	const Credentials = {
		username: userName,
		password: password,
		request_token: requestToken,
	};

	return axios.post<TRequestToken>(`${baseURL}`, Credentials);
};

export const logout = (session_id: string) => {
	const baseurl = `${BASE_URL}/authentication/session`;

	const Credentials = {
		session_id: session_id,
	};
	return axios.delete(baseurl, {
		data: Credentials,
	});
};

export const CreateSessionId = (requestToken: string) => {
	const baseURL = `${BASE_URL}/authentication/session/new`;

	const credential = { request_token: requestToken };

	return axios.post<TSessionSuccess>(baseURL, credential);
};

export const GetUserDetails = (session_id: string | undefined = undefined) => {
	const baseUrl = `${BASE_URL}/account`;

	const params = new URLSearchParams();
	params.set('session_id', session_id || 'undefined');

	return axios.get<TProfile | undefined>(`${baseUrl}?${params}`);
};

export const GetWatchProvider = (mediaType: 'tv' | 'movie', mediaID: string) => {
	const baseUrl = `${BASE_URL}/${mediaType}/${mediaID}/watch/providers`;

	return axios.get<TWatchProvider>(baseUrl);
};

export const GetRecommendedMedia = async (mediaType: 'movie' | 'tv') => {
	let trendingMovie: AxiosResponse<TTrendingMovieTV, any>;

	if (mediaType === 'tv') {
		trendingMovie = await GetTrendingMedia('tv', 'week');
	} else {
		trendingMovie = await GetTrendingMedia('movie', 'week');
	}

	const baseUrl = `${BASE_URL}/${mediaType}/${trendingMovie.data.results[0].id}/recommendations`;

	const params = new URLSearchParams();
	params.set('sort_by', 'popularity.desc');
	params.set('watch_region', 'IN');

	return axios.get<TMovieTV>(`${baseUrl}?${params}`);
};

export const GetFavoritesMedia = (
	session_id: string = 'undefined',
	mediaType: 'movies' | 'tv',
	userID: number | undefined
) => {
	const baseurl = `${BASE_URL}/account/${userID}/favorite/${mediaType}`;

	const params = new URLSearchParams();
	params.set('session_id', session_id.trim().length < 1 ? 'undefined' : session_id);

	return axios.get<TMovieTV | undefined>(`${baseurl}?${params}`);
};

export const ToggleFavoriteMedia = (
	payload: TBaseAction,
	session_id: string,
	userID: string
) => {
	const baseURL = `${BASE_URL}/account/${userID}/favorite`;

	const params = new URLSearchParams();
	params.set('session_id', session_id);

	return axios.post<TBaseApiResponse>(`${baseURL}?${params}`, payload, {
		transformRequest: [
			data => {
				return JSON.stringify(data);
			},
		],
	});
};

export const GetWatchlistMedia = (
	session_id: string = 'undefined',
	mediaType: 'movies' | 'tv',
	userID: number | undefined
) => {
	const baseurl = `${BASE_URL}/account/${userID}/watchlist/${mediaType}`;

	const params = new URLSearchParams();
	params.set('session_id', session_id.trim().length < 1 ? 'undefined' : session_id);

	return axios.get<TMovieTV | undefined>(`${baseurl}?${params}`);
};

export const ToggleWatchlistMedia = (
	payload: TBaseAction,
	session_id: string,
	userID: string
) => {
	const baseURL = `${BASE_URL}/account/${userID}/watchlist`;

	const params = new URLSearchParams();
	params.set('session_id', session_id);

	return axios.post<TBaseApiResponse>(`${baseURL}?${params}`, payload, {
		transformRequest: [
			data => {
				return JSON.stringify(data);
			},
		],
	});
};
