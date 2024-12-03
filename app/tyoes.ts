export interface PaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface TrendingMovieData extends BaseMovieData {
	name: string;
	original_name: string;
	media_type: string;
	first_air_date?: string;
	origin_country?: string[];
}

export interface PopularMovieData extends BaseMovieData {
	original_title: string;
	release_date?: string;
	title: string;
	video: boolean;
}

export interface FreeToWatchMovieData extends BaseMovieData {
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
}

export interface FreeToWatchTVData extends BaseMovieData {
	origin_country: string[];
	original_name: string;
	first_air_date: string;
	name: string;
}

interface BaseMovieData {
	id: number;
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	original_language: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	vote_average: number;
	vote_count: number;
}

export type TTrendingMovie = PaginatedResponse<TrendingMovieData>;
export type TPopularMovie = PaginatedResponse<PopularMovieData>;
export type TFreeToWatch = PaginatedResponse<FreeToWatchMovieData>;

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
} & (TMovieDetail | TTVDetail);

export interface TMovieDetail {
	belongs_to_collection: BelongsToCollection;
	budget: number;
	imdb_id: string;
	original_title: string;
	release_date: string;
	revenue: number;
	runtime: number;
	title: string;
	video: boolean;
}

export interface TTVDetail {
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
}

interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

interface Genre {
	id: number;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path?: string;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface LastEpisodeToAir {
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
}

export interface Network {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface Season {
	air_date?: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
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
	crew: MovieTVCrew[];
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

type TVCast = {};

type MovieTVCrew = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	credit_id: string;
	department: string;
	job: string;
};

//=================================Serach=====================================================================================

export type SearchMediaType = 'tv' | 'movie' | 'person' | 'multi';

interface TMultiSearchData {
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
}

interface KnownFor {
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
}

export type TMultiSearch = PaginatedResponse<TMultiSearchData>;

//======================================================================================================================
interface TMovieSearchData {
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
}

interface TTVShowsSearchData {
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
}

interface TPersonSearchData {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	known_for: KnownFor[];
}

interface KnownFor {
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
}

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
} & (MovieData | TVData);

interface MovieData {
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
}

interface TVData {
	origin_country: string[];
	original_name: string;
	first_air_date: string;
	name: string;
}

export function isMovieData(obj: BaseMovieTV): obj is BaseMovieTV & MovieData {
	return (
		(obj as MovieData).original_title !== undefined &&
		(obj as MovieData).release_date !== undefined
	);
}

export type TMovieTV = PaginatedResponse<BaseMovieTV>;
