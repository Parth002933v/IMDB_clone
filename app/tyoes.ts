import { z } from 'zod';

// export type ApiError = {
// 	statusCode?: number;
// 	status_message: string;
// 	detail?: any;
// };

export const TBaseApiResponseSchema = z.object({
	success: z.boolean(),
	status_code: z.number(),
	status_message: z.string(),
});
export type TBaseApiResponse = z.infer<typeof TBaseApiResponseSchema>;

export interface PaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

// export interface TrendingMovieData extends BaseMovieData {
// 	name: string;
// 	original_name: string;
// 	media_type: string;
// 	first_air_date?: string;
// 	origin_country?: string[];
// }
//
// export interface PopularMovieData extends BaseMovieData {
// 	original_title: string;
// 	release_date?: string;
// 	title: string;
// 	video: boolean;
// }
//
// export interface FreeToWatchMovieData extends BaseMovieData {
// 	original_title: string;
// 	release_date: string;
// 	title: string;
// 	video: boolean;
// }
//
// export interface FreeToWatchTVData extends BaseMovieData {
// 	origin_country: string[];
// 	original_name: string;
// 	first_air_date: string;
// 	name: string;
// }
//
// interface BaseMovieData {
// 	id: number;
// 	adult: boolean;
// 	backdrop_path?: string;
// 	genre_ids: number[];
// 	original_language: string;
// 	overview: string;
// 	popularity: number;
// 	poster_path?: string;
// 	vote_average: number;
// 	vote_count: number;
// }

// export type TTrendingMovie = PaginatedResponse<TrendingMovieData>;
// export type TPopularMovie = PaginatedResponse<PopularMovieData>;
// export type TFreeToWatch = PaginatedResponse<FreeToWatchMovieData>;

export type PopularMovieGroupType =
	| 'streaming'
	| 'on-tv'
	| 'for-rent'
	| 'in-theatres';
export const isPopularMovieGroupType = (
	value: string
): value is PopularMovieGroupType => {
	const allowedValues: PopularMovieGroupType[] = [
		'streaming',
		'on-tv',
		'for-rent',
		'in-theatres',
	];
	return allowedValues.includes(value as PopularMovieGroupType);
};

export type TrendingMovieGroupType = 'day' | 'week';
export const isTrendingMovieGroupType = (
	value: string
): value is TrendingMovieGroupType => {
	const allowedValues: TrendingMovieGroupType[] = ['day', 'week'];
	return allowedValues.includes(value as TrendingMovieGroupType);
};

export type FreeToWatchGroupType = 'movie' | 'tv';
export const isFreeToWatchMovieGroupType = (
	value: string
): value is FreeToWatchGroupType => {
	const allowedValues: FreeToWatchGroupType[] = ['movie', 'tv'];
	return allowedValues.includes(value as FreeToWatchGroupType);
};

//=================== movie detail===================================================================================================

export type BaseMediaDetails = {
	adult: boolean;
	backdrop_path: string;
	genres: Genre[];
	homepage: string;
	id: number;
	origin_country: string[];
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	vote_average: number;
	vote_count: number;
	credits: TCastCrew;
	'watch/providers': TWatchProvider;
} & (TMovieDetail | TTVDetail);

type TMovieDetail = {
	belongs_to_collection: BelongsToCollection;
	budget: number;
	imdb_id: string;
	original_title: string;
	release_date: string;
	revenue: number;
	runtime: number;
	title: string;
	video: boolean;
	release_dates: ReleaseDates;
};

export type ReleaseDates = {
	results: ReleaseDatesData[];
};

export type ReleaseDatesData = {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
};

export type ReleaseDate = {
	certification: string;
	descriptors: any[];
	iso_639_1: string;
	note: string;
	release_date: string;
	type: number;
};

export type TTVDetail = {
	created_by: any[];
	episode_run_time: number[];
	first_air_date: string;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: LastEpisodeToAir;
	name: string;
	next_episode_to_air: any;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	original_name: string;
	seasons: Season[];
	type: string;
	content_ratings: ContentRatings;
};

type BelongsToCollection = {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
};

type Genre = {
	id: number;
	name: string;
};

type ProductionCompany = {
	id: number;
	logo_path?: string;
	name: string;
	origin_country: string;
};

type ProductionCountry = {
	iso_3166_1: string;
	name: string;
};

type SpokenLanguage = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

type LastEpisodeToAir = {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
};

type Network = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

type Season = {
	air_date?: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
};

interface ContentRatings {
	results: ContentRatingsData[];
}

interface ContentRatingsData {
	descriptors: any[];
	iso_3166_1: string;
	rating: string;
}

export function isMovieDetail(
	obj: BaseMediaDetails
): obj is BaseMediaDetails & TMovieDetail {
	return (
		(obj as TMovieDetail).original_title !== undefined &&
		(obj as TMovieDetail).release_date !== undefined
	);
}

//======================================================================================================================

export type TCastCrew = {
	id: number;
	cast: BaseCast[];
	crew: BaseCrew[];
};

type BaseCast = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	character: string;
	credit_id: string;
	profile_path?: string;
	order: number;
} & (MovieCast | TVCast);

type MovieCast = {
	cast_id: number;
};

type TVCast = {
	roles: Role[];
	total_episode_count: number;
};

interface Role {
	credit_id: string;
	character: string;
	episode_count: number;
}

export function isTVCast(obj: BaseCast): obj is BaseCast & TVCast {
	return (
		(obj as TVCast).total_episode_count !== undefined &&
		(obj as TVCast).roles !== undefined
	);
}

type BaseCrew = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	department: string;

	job: string;
} & (MovieCrew | TVCrew);

type MovieCrew = {
	credit_id: string;
};

type TVCrew = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	department: string;
	total_episode_count: number;
};

type Job = {
	credit_id: string;
	job: string;
	episode_count: number;
};

//=================================Serach=====================================================================================

export type SearchMediaType = 'tv' | 'movie' | 'person' | 'multi';

type TMultiSearchData = {
	id: number;
	name: string;
	original_name: string;
	media_type: string;
	adult: boolean;
	popularity: number;
	gender?: number;
	known_for_department?: string;
	profile_path?: string;
	known_for?: KnownFor[];
	backdrop_path?: string;
	overview?: string;
	poster_path?: string;
	original_language?: string;
	genre_ids?: number[];
	first_air_date?: string;
	vote_average?: number;
	vote_count?: number;
	origin_country?: string[];
};

type KnownFor = {
	backdrop_path?: string;
	id: number;
	name?: string;
	original_name?: string;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	first_air_date?: string;
	vote_average: number;
	vote_count: number;
	origin_country?: string[];
	title?: string;
	original_title?: string;
	release_date?: string;
	video?: boolean;
};

export type TMultiSearch = PaginatedResponse<TMultiSearchData>;

//======================================================================================================================
type TMovieSearchData = {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

type TTVShowsSearchData = {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
};

type TPersonSearchData = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	known_for: KnownFor[];
};

// interface KnownFor {
// 	backdrop_path?: string;
// 	id: number;
// 	name?: string;
// 	original_name?: string;
// 	overview: string;
// 	poster_path: string;
// 	media_type: string;
// 	adult: boolean;
// 	original_language: string;
// 	genre_ids: number[];
// 	popularity: number;
// 	first_air_date?: string;
// 	vote_average: number;
// 	vote_count: number;
// 	origin_country?: string[];
// 	title?: string;
// 	original_title?: string;
// 	release_date?: string;
// 	video?: boolean;
// }

export type TMovieSearch = PaginatedResponse<TMovieSearchData>;
export type TTVShowsSearch = PaginatedResponse<TTVShowsSearchData>;
export type TPersonSearch = PaginatedResponse<TPersonSearchData>;

//======================================================================================================================
export type BaseTrendingMovieTV = {
	id: number;
	backdrop_path: string;
	overview: string;
	poster_path: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	vote_average: number;
	vote_count: number;
} & (TrendingMovieData2 | TrendingTVData);

export interface TrendingMovieData2 {
	media_type: 'movie';
	title: string;
	original_title: string;
	release_date: string;
	video: boolean;
}

interface TrendingTVData {
	media_type: 'tv';
	name: string;
	original_name: string;
	first_air_date: string;
	origin_country: string[];
}

export type TTrendingMovieTV = PaginatedResponse<BaseTrendingMovieTV>;

export type BaseMovieTV = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
	isFavourite?: boolean;
} & (MovieData | TVData);

type MovieData = {
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
};

type TVData = {
	origin_country: string[];
	original_name: string;
	first_air_date: string;
	name: string;
};

export function isMovieData(obj: BaseMovieTV): obj is BaseMovieTV & MovieData {
	return (
		(obj as MovieData).original_title !== undefined &&
		(obj as MovieData).release_date !== undefined
	);
}

export type TMovieTV = PaginatedResponse<BaseMovieTV>;

//================================Auth==================================================================================
const TRequestTokenSchema = z.object({
	success: z.boolean(),
	expires_at: z.string(), // You may want to add a check for date format if necessary
	request_token: z.string(),
});
export type TRequestToken = z.infer<typeof TRequestTokenSchema>;

export const TSessionErrorSchema = z.object({
	success: z.literal(false),
	failure: z.boolean(),
	status_code: z.number(),
	status_message: z.string(),
});

const TSessionSuccessSchema = z.object({
	success: z.literal(true),
	session_id: z.string(),
});

// const TSessionSchema = z.union([TSessionSuccessSchema, TSessionErrorSchema]);
export type TSessionSuccess = z.infer<typeof TSessionSuccessSchema>;

export interface TProfile {
	avatar: Avatar;
	id: number;
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	include_adult: boolean;
	username: string;
}

type Avatar = {
	gravatar: Gravatar;
	tmdb: Tmdb;
};

type Gravatar = {
	hash: string;
};

type Tmdb = {
	avatar_path: string | null;
};

//===========================Watch Provider=========================================
export type TWatchProvider = {
	id: number;
	results: Partial<watchProviderData>;
};

type watchProviderData = {
	AD: baseProvider;
	AE: baseProvider;
	AG: baseProvider;
	AL: baseProvider;
	AR: baseProvider;
	AT: baseProvider;
	AU: baseProvider;
	BA: baseProvider;
	BB: baseProvider;
	BE: baseProvider;
	BF: baseProvider;
	BG: baseProvider;
	BH: baseProvider;
	BM: baseProvider;
	BR: baseProvider;
	BS: baseProvider;
	BY: baseProvider;
	BZ: baseProvider;
	CA: baseProvider;
	CD: baseProvider;
	CH: baseProvider;
	CL: baseProvider;
	CO: baseProvider;
	CR: baseProvider;
	CV: baseProvider;
	CY: baseProvider;
	CZ: baseProvider;
	DE: baseProvider;
	DK: baseProvider;
	DO: baseProvider;
	DZ: baseProvider;
	EC: baseProvider;
	EG: baseProvider;
	ES: baseProvider;
	FI: baseProvider;
	FJ: baseProvider;
	FR: baseProvider;
	GB: baseProvider;
	GF: baseProvider;
	GG: baseProvider;
	GH: baseProvider;
	GI: baseProvider;
	GR: baseProvider;
	GT: baseProvider;
	GY: baseProvider;
	HK: baseProvider;
	HN: baseProvider;
	HR: baseProvider;
	HU: baseProvider;
	ID: baseProvider;
	IE: baseProvider;
	IL: baseProvider;
	IN: baseProvider;
	IS: baseProvider;
	IT: baseProvider;
	JM: baseProvider;
	JO: baseProvider;
	JP: baseProvider;
	KE: baseProvider;
	KR: baseProvider;
	KW: baseProvider;
	LB: baseProvider;
	LC: baseProvider;
	LT: baseProvider;
	LU: baseProvider;
	LV: baseProvider;
	LY: baseProvider;
	MA: baseProvider;
	MC: baseProvider;
	MD: baseProvider;
	ME: baseProvider;
	MK: baseProvider;
	MT: baseProvider;
	MU: baseProvider;
	MX: baseProvider;
	MY: baseProvider;
	MZ: baseProvider;
	NE: baseProvider;
	NG: baseProvider;
	NI: baseProvider;
	NL: baseProvider;
	NO: baseProvider;
	NZ: baseProvider;
	PE: baseProvider;
	PF: baseProvider;
	PG: baseProvider;
	PH: baseProvider;
	PK: baseProvider;
	PL: baseProvider;
	PS: baseProvider;
	PT: baseProvider;
	PY: baseProvider;
	QA: baseProvider;
	RO: baseProvider;
	RS: baseProvider;
	RU: baseProvider;
	SC: baseProvider;
	SE: baseProvider;
	SG: baseProvider;
	SI: baseProvider;
	SK: baseProvider;
	SM: baseProvider;
	SN: baseProvider;
	SV: baseProvider;
	TC: baseProvider;
	TD: baseProvider;
	TH: baseProvider;
	TN: baseProvider;
	TR: baseProvider;
	TT: baseProvider;
	TW: baseProvider;
	TZ: baseProvider;
	UA: baseProvider;
	US: baseProvider;
	UY: baseProvider;
	VE: baseProvider;
	XK: baseProvider;
	YE: baseProvider;
	ZA: baseProvider;
};

type baseProvider = {
	link: string;
	ads: providerData[];
	flatrate: providerData[];
};

export interface providerData {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

export type TBaseAction = {
	media_type: 'movie' | 'tv';
	media_id: number;
} & (TFavouriteAction | TWatchlistAction);

type TFavouriteAction = {
	favorite: boolean;
};

type TWatchlistAction = {
	watchlist: boolean;
};
