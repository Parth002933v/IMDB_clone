export const GetTrendingMovies = (by: 'day' | 'week') => {
	return fetch(`https://api.themoviedb.org/3/trending/tv/${by}?language=en-US`, {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};

export const GetPopularMovies = (
	by: 'Streaming' | 'On TV' | 'For Rent' | 'In Theaters'
) => {
	const baseURL = 'https://api.themoviedb.org/3/discover/movie';
	const params = new URLSearchParams();

	switch (by) {
		case 'Streaming':
			params.set('with_watch_monetization_types', 'flatrate');
			break;
		case 'On TV':
			params.set('with_release_type', '4');
			break;
		case 'For Rent':
			params.set('with_watch_monetization_types', 'rent');
			break;
		case 'In Theaters':
			params.set('with_release_type', '3');
			break;
		default:
			params.set('with_watch_monetization_types', 'flatrate');
	}

	return fetch(`${baseURL}?${params}`, {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOCKEN}`,
			'Content-Type': 'application/json',
		},
	});
};
