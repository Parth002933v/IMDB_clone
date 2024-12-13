import {
	index,
	layout,
	prefix,
	route,
	type RouteConfig,
} from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),

	...prefix('api/remote', [
		route('panel', './routes/remote/api/trendingMovies.tsx'),
		route('action', './routes/remote/api/action.tsx'),
	]),

	route('login', './routes/auth/login.tsx'),
	route('login2', './routes/auth/login2.tsx'),
	route('logout', './routes/auth/logout.tsx'),

	route('u/:username', './routes/profile/profile.tsx', [
		layout('./routes/profile/recommendation/Outlet.tsx', [
			index('./routes/profile/index.tsx'),
			...prefix('recommendations', [
				index('./routes/profile/recommendation/index.tsx'),
				route(
					'/movie',
					'./routes/profile/recommendation/MovieRecommendation.tsx'
				),
				route('/tv', './routes/profile/recommendation/TVRecommendation.tsx'),
			]),
		]),

		layout('./routes/profile/watchlist/outlet.tsx', [
			...prefix('watchlist', [
				index('./routes/profile/watchlist/index.tsx'),
				route('/movie', './routes/profile/watchlist/MovieWatchlist.tsx'),
				route('/tv', './routes/profile/watchlist/TVWatchlist.tsx'),
			]),
		]),


		layout('./routes/profile/favourite/Outlet.tsx', [
			...prefix('favourite', [
				index('./routes/profile/favourite/index.tsx'),
				route('/movie', './routes/profile/favourite/MovieFavourites.tsx'),
				route('/tv', './routes/profile/favourite/TVFavourites.tsx'),
			]),
		]),


	]),

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