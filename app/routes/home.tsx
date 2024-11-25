import React from 'react';
import { Route } from '../../.react-router/types/app/routes/+types/home';
import { MetaFunction } from 'react-router';
import MoviesScrollList from '~/components/home/moviesScrollList';
import Banner from '~/components/home/banner';
import Trailers from '~/components/home/Trailers';
import { GetPopularMovies, GetTrendingMovies } from '~/common/api';
import { TPopularMovie, TTrendingMovie } from '~/tyoes';

export const meta: MetaFunction = () => {
	return [
		{ title: 'IMDB' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
};

export async function loader({ context }: Route.LoaderArgs) {
	const res = await Promise.all([
		GetTrendingMovies('day'),
		GetPopularMovies('Streaming'),
	]);

	const [trendingMovies, popularMovies] = await Promise.all([
		res[0].json() as Promise<TTrendingMovie>,
		res[1].json() as Promise<TPopularMovie>,
	]);
	return {
		trendingMovies,
		popularMovies,
	};
}

const Home = ({ loaderData }: Route.ComponentProps) => {
	const { trendingMovies, popularMovies } = loaderData;

	return (
		<div className="mx-auto h-fit w-full max-w-[1320px]">
			{/*banner*/}
			<Banner />

			<div className={'flex w-full flex-col gap-7 pt-7'}>
				<div className="relative">
					<img
						alt={'trending-banner'}
						src="/sample/trending-bg.svg"
						className="absolute bottom-0 top-36 -z-10 object-cover"
					/>
					<MoviesScrollList
						title="Trending"
						movieList={trendingMovies.results}
						menuItems={['Today', 'This Week', 'This Month']}
					/>
				</div>

				<Trailers />

				<MoviesScrollList
					title="What's Popular"
					movieList={popularMovies.results}
					menuItems={['Streaming', 'On TV', 'For Rent', 'In Theaters']}
				/>

				<MoviesScrollList
					title="Free To Watch"
					movieList={trendingMovies.results}
					menuItems={['Movies', 'TV']}
				/>
			</div>
		</div>
	);
};

export default Home;
