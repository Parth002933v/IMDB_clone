import {
	index,
	layout,
	prefix,
	route,
	type RouteConfig,
} from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),
	route('remote/panel', './routes/remote/api/trendingMovies.tsx'),
	route('login', './routes/auth/login.tsx'),
	route('logout', './routes/auth/logout.tsx'),
	// route('tv/:id', './routes/detail/detail_tv.tsx'),
	// route(':mediaType/:id', './routes/detail/mediaDetail.tsx'),
	// route(':mediaType','./routes/detail/mediaDetail.tsx', [
	// 	route(':id', './routes/detail/detail_movie.tsx'),
	// ]),

	route('movie/:id', './routes/detail/detail_movie.tsx'),
	route('tv/:id', './routes/detail/detail_tv.tsx'),

	route('search', './routes/search/search.tsx', [
		index('./routes/search/index.tsx'),
		route('movie', './routes/search/search_movie.tsx'),
		route('tv', './routes/search/search_tv.tsx'),
		route('person', './routes/search/search_people.tsx'),
	]),
] satisfies RouteConfig;
// Disclaimer
// This website is a clone created for educational purposes only. It is not intended for actual use, and while you may choose to interact with it, we do not recommend using it for any critical or real-world applications. Any similarity to the TMDB website is purely for learning purposes. Use at your own discretion.