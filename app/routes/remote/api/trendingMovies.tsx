import { GetFreeShow, GetPopularMovies, GetTrendingMovies } from '~/common/api';
import {
	isFreeToWatchMovieGroupType,
	isPopularMovieGroupType,
	isTrendingMovieGroupType,
	TFreeToWatch,
	TPopularMovie,
	TTrendingMovie,
} from '~/tyoes';
import { Route } from '../../../../.react-router/types/app/routes/remote/api/+types/trendingMovies';
import { data } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	console.log(url.href);

	const searchParam = url.searchParams;
	const panel = searchParam.get('panel');
	const group = searchParam.get('group');
	if (panel == null || group == null) {
		throw data('the params is not valid', { status: 400 });
	}
	// console.log("==== params",url.searchParams,"params ====");

	switch (panel) {
		case 'trending_scroll': {
			if (!isTrendingMovieGroupType(group)) {
				throw data('the params is not valid', { status: 400 });
			} else {
				const res = await GetTrendingMovies(group);
				return (await res.json()) as Promise<TTrendingMovie>;
			}
		}

		case 'popular_scroller': {
			if (!isPopularMovieGroupType(group)) {
				throw data('the params is not valid', { status: 400 });
			} else {
				const res = await GetPopularMovies(group);
				return (await res.json()) as Promise<TPopularMovie>;
			}
		}

		case 'free_scroller': {
			if (!isFreeToWatchMovieGroupType(group)) {
				throw data('the params is not valid', { status: 400 });
			} else {
				const res = await GetFreeShow(group);
				return (await res.json()) as Promise<TFreeToWatch>;
			}
		}

		default:
			throw data('the params is not valid', { status: 400 });
	}
}

export default function TrendingMovies({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<ul>
				{loaderData.results.map(m => (
					<li key={m.id}>
						<img
							alt="poster image"
							src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
						/>
						<h3 className="text-lg text-blue-400 underline">
							{
								// @ts-ignore
								m.original_name || m.original_title
							}
						</h3>
						<span className="text-blue-400 underline">
							{
								// @ts-ignore
								m.first_air_date || m.release_date
							}
						</span>
					</li>
				))}
			</ul>
		</>
	);
}
