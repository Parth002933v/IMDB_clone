import React from 'react';
import { Route } from '../../.react-router/types/app/routes/+types/home';
import { MetaFunction } from 'react-router';
import MoviesScrollList from '~/components/home/moviesScrollList';
import Banner from '~/components/home/banner';
import Trailers from '~/components/home/Trailers';
import { GetFreeShow, GetPopularMovies, GetTrendingMovies } from '~/common/api';
import { TFreeToWatch, TPopularMovie, TTrendingMovie } from '~/tyoes';
import useCustomFetcher from '~/hooks/useCustomFetcher';
import { getRandomInt } from '~/lib/utils';

export const meta: MetaFunction = () => {
	return [
		{ title: 'IMDB' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
};

export async function loader({}: Route.LoaderArgs) {
	const res = await Promise.all([
		GetTrendingMovies('day'),
		GetPopularMovies('streaming'),
		GetFreeShow('movie'),
	]);

	const [trendingMovies, popularMovies, freeToWatch] = await Promise.all([
		res[0].json() as Promise<TTrendingMovie>,
		res[1].json() as Promise<TPopularMovie>,
		res[2].json() as Promise<TFreeToWatch>,
	]);

	const randomBanner =
		trendingMovies.results[getRandomInt(trendingMovies.results.length)]
			.backdrop_path;

	return {
		trendingMovies,
		popularMovies,
		freeToWatch,
		randomBanner,
	};
}

const Home = ({ loaderData }: Route.ComponentProps) => {
	const {
		fetcher: trendingMovieFetcher,
		data: trendingMovieData,
		fetcherState: trendingMovieFetcherSate,
	} = useCustomFetcher<TTrendingMovie>(loaderData.trendingMovies);

	const {
		fetcher: popularMovieFetcher,
		data: popularMovieData,
		fetcherState: popularMovieFetchState,
	} = useCustomFetcher<TPopularMovie>(loaderData.popularMovies);

	const {
		fetcher: freeToWatchMovieFetcher,
		data: freeToWatchMovieData,
		fetcherState: freeToWatchFetcherState,
	} = useCustomFetcher<TFreeToWatch>(loaderData.freeToWatch);

	return (
		<div className="mx-auto h-fit w-full max-w-[1320px]">
			{/*banner*/}
			<Banner path={loaderData.randomBanner} />

			<div className={'flex w-full flex-col gap-7 pt-7'}>
				<div className="relative">
					<img
						alt={'trending-banner'}
						src="/sample/trending-bg.svg"
						className="absolute bottom-0 top-44 -z-10 object-cover"
					/>
					<MoviesScrollList
						LoadingStatus={trendingMovieFetcherSate}
						key={'trending'}
						title="Trending"
						onSelect={value => {
							const param = new URLSearchParams();
							param.set('panel', 'trending_scroll');
							param.set('group', 'today');

							if (value === 'Today') param.set('group', 'day');
							if (value === 'This Week') param.set('group', 'week');

							trendingMovieFetcher.load(`/remote/panel?${param.toString()}`);
						}}
						movieList={trendingMovieData.results}
						menuItems={['Today', 'This Week']}
					/>
				</div>

				<Trailers />

				<MoviesScrollList
					LoadingStatus={popularMovieFetchState}
					title="What's Popular"
					movieList={popularMovieData.results}
					menuItems={['Streaming', 'On TV', 'For Rent', 'In Theaters']}
					onSelect={value => {
						const param = new URLSearchParams();
						param.set('panel', 'popular_scroller');
						param.set('group', 'streaming');

						if (value === 'Streaming') param.set('group', 'streaming');
						if (value === 'On TV') param.set('group', 'on-tv');
						if (value === 'For Rent') param.set('group', 'for-rent');
						if (value === 'In Theaters') param.set('group', 'in-theatres');

						popularMovieFetcher.load(`/remote/panel?${param.toString()}`);
					}}
				/>

				<MoviesScrollList
					LoadingStatus={freeToWatchFetcherState}
					title="Free To Watch"
					movieList={freeToWatchMovieData.results}
					menuItems={['Movies', 'TV']}
					onSelect={value => {
						const param = new URLSearchParams();
						param.set('panel', 'free_scroller');
						param.set('group', 'movie');

						if (value === 'Movies') param.set('group', 'movie');
						if (value === 'TV') param.set('group', 'tv');

						freeToWatchMovieFetcher.load(`/remote/panel?${param.toString()}`);
					}}
				/>
			</div>
		</div>
	);
};

export default Home;
