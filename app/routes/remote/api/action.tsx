import React from 'react';
import { GetUserDetails, ToggleFavoriteMedia, ToggleWatchlistMedia } from '~/lib/api';
import { TBaseAction } from '~/tyoes';
import { getCookieSessionFromHeader } from '~/lib/sessionStorage';
import { convertFormDataToObject } from '~/lib/utils';
import { data } from 'react-router';
import { Route } from '../../../../.react-router/types/app/routes/remote/api/+types/action';

export async function action({ request, params, context }: Route.ActionArgs) {
	console.log('in action');
	// const formData = new URLSearchParams(await request.text());

	const cookieSession = await getCookieSessionFromHeader(request);
	const user = await GetUserDetails(cookieSession);

	if (user.data == undefined) {
		return;
	}
	// let payload: TBaseAction;
	const formData = await request.formData();

	const typeMap = {
		favorite: 'boolean',
		watchlist: 'boolean',
		media_id: 'number',
	};

	// @ts-ignore
	const formDataToObject = convertFormDataToObject<TBaseAction>(formData, typeMap);
	if (formDataToObject['x-type'] === 'favorite') {
		const res = await ToggleFavoriteMedia(
			formDataToObject,
			cookieSession,
			user.data.id.toString()
		);

		if (res.data.success == true) {
			return data(res.data);
		} else {
			return;
		}
	} else if (formDataToObject['x-type'] === 'watchlist') {
		const res = await ToggleWatchlistMedia(
			formDataToObject,
			cookieSession,
			user.data.id.toString()
		);

		if (res.data.success == true) {
			return data(res.data);
		} else {
			return;
		}
	}

	// const media_type = formData.get('media_type') as 'movie' | 'tv';
	// const media_id = parseInt((formData.get('media_id') as string) || '0', 10);
	// const favorite = formData.has('favorite')
	// 	? formData.get('favorite') === 'true'
	// 	: undefined;
	// const watchlist = formData.has('watchlist')
	// 	? formData.get('watchlist') === 'true'
	// 	: undefined;
	//
	// if (favorite) {
	// 	payload = {
	// 		media_type: media_type,
	// 		media_id: media_id,
	// 		favorite: favorite,
	// 	};
	// } else if (watchlist) {
	// 	payload = {
	// 		media_type: media_type,
	// 		media_id: media_id,
	// 		watchlist: watchlist,
	//
	// 	};
	// 	console.log(formData.get('favorite'));
	// 	console.log(payload);
	// }
}

const Action = () => {
	return <div>Route not valid for get request </div>;
};

export default Action;
