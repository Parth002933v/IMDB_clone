import {
	BaseMediaDetails,
	FreeToWatchGroupType,
	PopularMovieGroupType,
	SearchMediaType,
	TApiError,
	TCastCrew,
	TMovieTV,
	TProfile,
	TrendingMovieGroupType,
	TRequestToken,
	TSessionSuccess,
	TTrendingMovieTV,
} from '~/tyoes';
import { axios } from '~/lib/apiHandler';
import { BASE_URL } from '~/lib/constant';
// 20429186

export const GetTrendingMovies = (by: TrendingMovieGroupType) => {
	return axios.get<TTrendingMovieTV>(
		`${BASE_URL}/trending/all/${by}?language=en-US`
	);
};

export const GetPopularMovies = (by: PopularMovieGroupType) => {
	let baseURL = `${BASE_URL}/discover/movie`;
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
	return axios.get<TMovieTV>(`${baseURL}?${params}`);
};

export const GetFreeShow = (by: FreeToWatchGroupType) => {
	const baseUrl = `${BASE_URL}/discover/${by}`;

	const params = new URLSearchParams();
	params.set('with_watch_monetization_types', 'free');
	params.set('watch_region', 'IN');
	params.set('language', 'en-US');

	return axios.get<TMovieTV>(`${baseUrl}?${params.toString()}`);
};

export const GetMovieTVById = (id: string, mediaType: 'movie' | 'tv') => {
	const baseUrl = `${BASE_URL}/${mediaType}/${id}`;
	const param = new URLSearchParams();
	param.set('language', 'en-US');

	return axios.get<BaseMediaDetails>(`${baseUrl}?${param.toString()}`);
};

export const GetCastCrewByMovieId = (movieId: string, mediaType: 'movie' | 'tv') => {
	const baseUrl = `${BASE_URL}/${mediaType}/${movieId}/credits`;
	const param = new URLSearchParams();
	param.set('language', 'en-US');

	return axios.get<TCastCrew>(`${baseUrl}?${param.toString()}`);
};

export const GetSearchResult = <T>(
	keyword: string,
	mediaType: SearchMediaType,
	page = '1'
) => {
	const baseURL = `${BASE_URL}/search/${mediaType}`;

	const params = new URLSearchParams();
	params.set('language', 'en-US');
	params.set('include_adult', 'false');
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
		session_id: session_id
	};
	return axios.delete(baseurl, {
		data: Credentials
	});
};

export const CreateSessionId = (requestToken: string) => {
	const baseURL = `${BASE_URL}/authentication/session/new`;

	const credential = { request_token: requestToken };

	return axios.post<TSessionSuccess>(baseURL, credential);
};

export const GetUserDetails = () => {
	const baseUrl = `${BASE_URL}/account`;

	// const params = new URLSearchParams();
	// params.set('session_id', session_id);

	return axios.get<TProfile | undefined>(`${baseUrl}`);
};
