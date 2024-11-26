import { Route } from '../../.react-router/types/app/routes/+types/search';
import { GetTrendingMovies } from '~/common/api';
import { TTrendingMovie } from '~/tyoes';

export async function loader({ request }: Route.LoaderArgs) {
	const res = await GetTrendingMovies('week');
	// return (await res.json()) as TrendingMovieData[] | PopularMovieData[];
	const jsonparsed = (await res.json()) as Promise<TTrendingMovie>;

	return jsonparsed;
}

export default function Search() {
	return <>search route</>;
}
