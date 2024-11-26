import React from 'react';
import FilterMenu from '~/components/home/filterMenu';
import MovieCard from '~/components/movieCard';
import { TrendingMovieData, PopularMovieData } from '~/tyoes';

interface TrendingProps<T extends string> {
	movieList: TrendingMovieData[] | PopularMovieData[];
	title: string;
	menuItems: T[];
	onSelect?: (value: T) => void;
}

const MoviesScrollList = <T extends string>({
	movieList,
	title,
	menuItems,
	onSelect,
}: TrendingProps<T>) => {
	return (
		<div>
			<FilterMenu
				onClick={value => onSelect && onSelect(value)}
				menuTitle={title}
				menuOptions={menuItems}
			/>

			<div className="relative mt-5">
				<ul className="relative flex h-full w-full gap-5 overflow-x-auto pb-9 pl-6 scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100">
					{movieList.map((data, i) => (
						<MovieCard
							key={data.id}
							imgurl={data.poster_path}
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
