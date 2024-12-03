import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),
	route('remote/panel', './routes/remote/api/trendingMovies.tsx'),
	route(':mediaType/:id', './routes/mediaDetail.tsx'),

	// route('tv/:id', './routes/detail/detail_tv.tsx'),

	route('search', './routes/search/search.tsx', [
		index('./routes/search/index.tsx'),
		route('movie', './routes/search/search_movie.tsx'),
		route('tv', './routes/search/search_tv.tsx'),
		route('person', './routes/search/search_people.tsx'),
	]),
] satisfies RouteConfig;
