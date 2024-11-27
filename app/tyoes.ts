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

export interface FreeToWatchData extends BaseMovieData {
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
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
export type TFreeToWatch = PaginatedResponse<FreeToWatchData>;

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

//======================================================================================================================

export interface TMovieDetail {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: BelongsToCollection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
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

//======================================================================================================================