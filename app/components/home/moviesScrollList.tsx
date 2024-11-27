import React from 'react';
import FilterMenu from '~/components/home/filterMenu';
import MovieCard from '~/components/movieCard';
import { TrendingMovieData, PopularMovieData } from '~/tyoes';
import { twMerge } from 'tailwind-merge';

interface TrendingProps<T extends string> {
	movieList: TrendingMovieData[] | PopularMovieData[];
	title: string;
	menuItems: T[];
	onSelect?: (value: T) => void;
	LoadingStatus?: 'idle' | 'loading' | 'submitting';
}

const MoviesScrollList = <T extends string>({
	movieList,
	title,
	menuItems,
	onSelect,
	LoadingStatus,
}: TrendingProps<T>) => {
	return (
		<div className="relative">
			<FilterMenu
				onClick={value => onSelect && onSelect(value)}
				menuTitle={title}
				menuOptions={menuItems}
			/>

			<div className="relative mt-5">
				<div
					className={twMerge(
						'pointer-events-auto absolute hidden h-full w-full rounded-lg',
						LoadingStatus === 'loading' && 'z-[1] block bg-gray-400 opacity-50'
					)}
				></div>
				<ul className="relative flex h-full w-full gap-5 overflow-x-auto pb-9 pl-6 scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100">
					{movieList.map((data, i) => (
						<MovieCard
							key={data.id}
							imgurl={data.poster_path}
							// @ts-ignore
							movieTitle={data.name || data.title}
							// @ts-ignore
							releaseDate={data.first_air_date || data.release_date}
							averageVote={data.vote_average}
						/>
					))}
					{/*<MovieCard />*/}
				</ul>
			</div>
		</div>
	);
};

export default MoviesScrollList;
