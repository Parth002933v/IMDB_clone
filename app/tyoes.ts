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
