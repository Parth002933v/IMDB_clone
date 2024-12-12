import React from 'react';
import { useOutletContext } from 'react-router';
import { MovieSearchComponent } from '~/routes/search/search_movie';
import { TMovieSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { TVSearchComponent } from '~/routes/search/search_tv';
import { PeopleSearchComponent } from '~/routes/search/search_people';
import { Route } from '../../../.react-router/types/app/routes/search/+types';
// import { Route } from '../../../.react-router/types/app/routes/search/+types/search';

const Index = ({ }: Route.ComponentProps) => {

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
		return <TVSearchComponent outlet={outlet.data.searchedTVShows} />;
	} else if (outlet.mediaType[0] == 'person') {
		return <PeopleSearchComponent outlet={outlet.data.searchedPersons} />;
	}
	return <div>index</div>;
};

export default Index;
