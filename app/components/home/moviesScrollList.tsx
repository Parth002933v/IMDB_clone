import React from 'react';
import FilterMenu from '~/components/home/filterMenu';
import MovieCard from '~/components/movieCard';
import { TrendingMovieData, PopularMovieData } from '~/tyoes';

interface TrendingProps {
	movieList: TrendingMovieData[] | PopularMovieData[];
	title: string;
	menuItems: string[];
}

const MoviesScrollList = ({ movieList, title, menuItems }: TrendingProps) => {
	return (
		<div>
			<FilterMenu menuTitle={title} menuOptions={menuItems} />

			<div className="relative mt-5">
				<ul className="scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100 relative flex h-full w-full gap-5 overflow-x-auto pb-9 pl-6">
					{movieList.map((data, i) => (
						<MovieCard
							key={data.id}
							imgurl={data.poster_path}
							averageVote={data.vote_average}
						/>
					))}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
					{/*<MovieCard />*/}
				</ul>
			</div>
		</div>
	);
};

export default MoviesScrollList;
