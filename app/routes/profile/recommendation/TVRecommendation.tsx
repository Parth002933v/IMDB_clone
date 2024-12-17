import React, { useEffect, useState } from 'react';
import ProfileMediaCard from '~/components/profileMediaCard';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/TVRecommendation';
import { GetRecommendedMedia } from '~/lib/api';
import {
	getCookieSessionFromHeader,
	getUserFromRequest,
} from '~/lib/sessionStorage';
import { addToFavouriteAndWatchlistFieldValue } from '~/lib/utils';
import useCustomFetcher from '~/hooks/useCustomFetcher';
import { TBaseApiResponseSchema, TMovieTV } from '~/tyoes';
import { isRouteErrorResponse } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
	const recommendedMovie = await GetRecommendedMedia('tv');

	const cookieSession = await getCookieSessionFromHeader(request);

	const profileDetail = await getUserFromRequest(request);
	if (profileDetail === undefined) {
		return;
	}

	await addToFavouriteAndWatchlistFieldValue(
		recommendedMovie.data,
		cookieSession,
		profileDetail.id,
		'tv'
	);

	// const usersFavouriteMovie = await GetFavoritesMedia(
	// 	cookieSesstion,
	// 	'tv',
	// 	profileDetail.data.id
	// );
	// const userWatchlistMovies = await GetWatchlistMedia(
	// 	cookieSesstion,
	// 	'tv',
	// 	profileDetail.data.id
	// );
	//
	// if (
	// 	usersFavouriteMovie.data === undefined ||
	// 	userWatchlistMovies.data === undefined
	// ) {
	// 	return;
	// }
	// usersFavouriteMovie.data.results.forEach(fav => {
	// 	const match = recommendedMovie.data.results.find(rco => rco.id === fav.id);
	// 	if (match) {
	// 		match.isFavourite = true;
	// 	}
	// });
	//
	// usersFavouriteMovie.data.results.forEach(fav => {
	// 	const match = recommendedMovie.data.results.find(rco => rco.id === fav.id);
	// 	if (match) {
	// 		match.isFavourite = true;
	// 	}
	// });
	// userWatchlistMovies.data.results.forEach(wal => {
	// 	const match = recommendedMovie.data.results.find(rco => rco.id === wal.id);
	// 	if (match) {
	// 		match.isWatchListed = true;
	// 	}
	// });

	return recommendedMovie.data;
}


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

const TVRecommendation = ({ loaderData }: Route.ComponentProps) => {
	if (!loaderData) {
		return <>User Not Found</>;
	}

	const [movie, setMovie] = useState(loaderData.results);

	const { fetcher, fetcherState, data } = useCustomFetcher<TMovieTV | undefined>(
		undefined
	);

	useEffect(() => {
		if (!data || !data.results) {
			return;
		}
		setMovie(prevState => [...prevState, ...data.results]);
		loaderData.page = data.page;
	}, [data]);

	useEffect(() => {
		setMovie(prevState => [...loaderData.results]);
	}, [loaderData, loaderData.results]);

	return (
		<div className="flex h-full w-full flex-col gap-4 px-5">
			{movie.map(m => (
				<ProfileMediaCard key={m.id} cardData={m} />
			))}
				{loaderData.page > 0 && loaderData.page < loaderData.total_pages && (
				<div
					onClick={() => {
						const params = new URLSearchParams();
						params.set('group-type', 'Recommendations');
						params.set('page', (loaderData.page + 1).toString());
						params.set('media_type', 'tv');
						fetcher.load(`/api/remote/load-items?${params}`);
					}}
					className="w-full cursor-pointer rounded-lg bg-purple-500 py-3 text-center text-xl font-bold text-white"
				>
					{fetcherState === 'loading' ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18px"
							fill="#fff"
							className="ml-2 inline animate-spin"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
								data-original="#000000"
							/>
						</svg>
					) : (
						<>Load More</>
					)}
				</div>
			)}
		</div>
	);
};

export default TVRecommendation;
