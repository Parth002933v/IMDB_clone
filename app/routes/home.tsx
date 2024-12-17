import React, { useRef } from 'react';
import { Route } from '../../.react-router/types/app/routes/+types/home';
import { isRouteErrorResponse, MetaFunction } from 'react-router';
import MoviesScrollList from '~/components/home/moviesScrollList';
import Banner from '~/components/home/banner';
import Trailers from '~/components/home/Trailers';
import { GetFreeShow, GetPopularMovies, GetTrendingMedia } from '~/lib/api';
import { isMovieData, TBaseApiResponseSchema, TMovieTV, TTrendingMovieTV } from '~/tyoes';
import useCustomFetcher from '~/hooks/useCustomFetcher';
import { getRandomInt } from '~/lib/utils';

export const meta: MetaFunction = () => {
	return [
		{ title: 'IMDB' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const APIError = TBaseApiResponseSchema.safeParse(error || '');
	if (APIError.success) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
				<div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
					<h1 className="mb-4 text-4xl font-bold text-red-600">
						Error {APIError.data.status_code}
					</h1>
					<h2 className="mb-4 text-xl text-gray-700">
						{APIError.data.status_message}
					</h2>
					{/*<p className="mb-6 text-lg text-gray-600">{APIError.data.}</p>*/}

					<div className="flex justify-center">
						<button
							onClick={() => window.location.reload()}
							className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	} else if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>

				<div className="flex justify-center">
					<button
						onClick={() => window.location.reload()}
						className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Retry
					</button>
				</div>
			</>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
				<div className="flex justify-center">
					<button
						onClick={() => window.location.reload()}
						className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Retry
					</button>
				</div>
			</div>
		);
	} else {
		return <h1>"unknown"</h1>;
	}
}

export async function loader({ request }: Route.LoaderArgs) {
	const trendingMovies = await GetTrendingMedia('all', 'day');
	const popularMovies = await GetPopularMovies('streaming');
	const freeToWatch = await GetFreeShow('movie');

	const randomBanner =
		trendingMovies.data.results[getRandomInt(trendingMovies.data.results.length)]
			.backdrop_path;

	return {
		trendingMovies: trendingMovies.data,
		popularMovies: popularMovies.data,
		freeToWatch: freeToWatch.data,
		randomBanner,
	};
}

function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const Home = ({ loaderData }: Route.ComponentProps) => {
	const SerachRef = useRef(null);
	const {
		fetcher: trendingMovieFetcher,
		data: trendingMovieData,
		fetcherState: trendingMovieFetcherSate,
	} = useCustomFetcher<TTrendingMovieTV>(loaderData.trendingMovies);

	const {
		fetcher: popularMovieFetcher,
		data: popularMovieData,
		fetcherState: popularMovieFetchState,
	} = useCustomFetcher<TMovieTV>(loaderData.popularMovies);

	const {
		fetcher: freeToWatchMovieFetcher,
		data: freeToWatchMovieData,
		fetcherState: freeToWatchFetcherState,
	} = useCustomFetcher<TMovieTV>(loaderData.freeToWatch);

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

							trendingMovieFetcher.load(
								`api/remote/panel?${param.toString()}`
							);
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
					navigateParam="movie"
					menuItems={['Streaming', 'On TV', 'For Rent', 'In Theaters']}
					onSelect={value => {
						const param = new URLSearchParams();
						param.set('panel', 'popular_scroller');
						param.set('group', 'streaming');

						if (value === 'Streaming') param.set('group', 'streaming');
						if (value === 'On TV') param.set('group', 'on-tv');
						if (value === 'For Rent') param.set('group', 'for-rent');
						if (value === 'In Theaters') param.set('group', 'in-theatres');

						popularMovieFetcher.load(`api/remote/panel?${param.toString()}`);
					}}
				/>

				<MoviesScrollList
					LoadingStatus={freeToWatchFetcherState}
					title="Free To Watch"
					navigateParam={
						isMovieData(freeToWatchMovieData.results[0]) ? 'movie' : 'tv'
					}
					movieList={freeToWatchMovieData.results}
					menuItems={['Movies', 'TV']}
					onSelect={value => {
						const param = new URLSearchParams();
						param.set('panel', 'free_scroller');
						param.set('group', 'movie');

						if (value === 'Movies') param.set('group', 'movie');
						if (value === 'TV') param.set('group', 'tv');

						freeToWatchMovieFetcher.load(
							`api/remote/panel?${param.toString()}`
						);
					}}
				/>
			</div>
		</div>
	);
};

export default Home;
