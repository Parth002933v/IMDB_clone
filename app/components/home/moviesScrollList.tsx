import React from 'react';
import FilterMenu from '~/components/home/filterMenu';
import MovieCard from '~/components/movieCard';
import { BaseMovieTV, BaseTrendingMovieTV, isMovieData } from '~/tyoes';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router';

interface TrendingProps<T extends string> {
	// movieList: BaseTrendingMovieTV[] | BaseMovieTV[];

	movieList: BaseMovieTV[];
	navigateParam?: 'movie' | 'tv';
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
	navigateParam,
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
				<ul className="relative flex h-full w-full gap-5 overflow-x-auto pb-9 pl-6 duration-300 scrollbar scrollbar-track-transparent scrollbar-thumb-gray-100">
					{movieList.map((data, i) => {
						const isMovie = isMovieData(data);
						return (
							<Link
								viewTransition
								to={`/${isMovie ? 'movie' : 'tv'}/${data.id}-${isMovie ? `${data.title.replaceAll(' ', '-')}` : `${data.name.replaceAll(' ', '-')}`}`}
								// to={`/${navigateParam ? navigateParam : data.media_type}/${data.id}`}
								key={data.id}
							>
								<MovieCard
									key={data.id}
									imgurl={data.poster_path}
									movieTitle={isMovie ? data.title : data.name}
									releaseDate={
									isMovie
											? data.release_date
											: data.first_air_date
									}
									averageVote={data.vote_average}
								/>
							</Link>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default MoviesScrollList;
