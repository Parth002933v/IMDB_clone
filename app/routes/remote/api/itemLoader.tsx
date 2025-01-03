import React from 'react';
import { Route } from '../../../../.react-router/types/app/routes/remote/api/+types/itemLoader';
import { data } from 'react-router';
import { GetRecommendedMedia } from '~/lib/api';
import {
	getCookieSessionFromHeader,
	getUserFromRequest,
} from '~/lib/sessionStorage';
import { addToFavouriteAndWatchlistFieldValue } from '~/lib/utils';

export async function loader({ request }: Route.LoaderArgs) {

	const cookieSession = await getCookieSessionFromHeader(request);
	const user = await getUserFromRequest(request);
	if (user === undefined) {
		return;
	}

	const url = new URL(request.url);
	// console.log(url);

	const searchParam = url.searchParams;
	const groupType = searchParam.get('group-type');
	const page = searchParam.get('page');
	const mediaType = searchParam.get('media_type');

	if (groupType == null || page == null || mediaType == null) {
		throw data('the params is not valid', { status: 400 });
	}

	// console.log(groupType);
	switch (groupType) {
		case 'Recommendations': {
			if (mediaType == 'movie') {
				const res = await GetRecommendedMedia('movie', parseInt(page, 10));
				await addToFavouriteAndWatchlistFieldValue(
					res.data,
					cookieSession,
					user.id,
					'movies'
				);

				return res.data;
			}
		}

	}
}

const MyComponent = () => {
	return <div>this method is not supopoeted</div>;
};

export default MyComponent;
