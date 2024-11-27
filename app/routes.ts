import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),
	route('remote/panel', './routes/remote/api/trendingMovies.tsx'),
	route('movie/:id', './routes/movieDetail.tsx'),
] satisfies RouteConfig;
