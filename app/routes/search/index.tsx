import React from 'react';
import { Route } from '../../../.react-router/types/app/routes/search/+types';
import { useOutletContext } from 'react-router';
import { MovieSearchComponent } from '~/routes/search/search_movie';
import { TMovieSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { TVSearchComponent } from '~/routes/search/search_tv';
import { PeopleSearchComponent } from '~/routes/search/search_people';

const Index = ({ matches }: Route.ComponentProps) => {
	const outlet: {
		data: {
			searchedMovies: TMovieSearch;
			searchedTVShows: TTVShowsSearch;
			searchedPersons: TPersonSearch;
		};
		mediaType: any;
	} = useOutletContext();

	if (outlet.mediaType[0] == 'movie') {
		return <MovieSearchComponent outlet={outlet.data.searchedMovies} />;
	} else if (outlet.mediaType[0] == 'tv') {
		return <TVSearchComponent outlet={outlet.data.searchedTVShows.results} />;
	} else if (outlet.mediaType[0] == 'person') {
		return <PeopleSearchComponent outlet={outlet.data.searchedPersons.results} />;
	}
	return <div>index</div>;
};

export default Index;