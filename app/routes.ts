import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),
	route('search', './routes/search.tsx'),
	route('remote/panel', './routes/remote/api/trendingMovies.tsx'),
] satisfies RouteConfig;
