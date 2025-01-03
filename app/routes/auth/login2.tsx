
import React, { useEffect } from 'react';
import {
	data,
	Form,

	redirect,
	redirectDocument,
	UNSAFE_DataWithResponseInit,
	useFetcher,
	useRevalidator,
} from 'react-router';
import { createRequestToken, CreateSessionId, login } from '~/lib/api';
import {
	cookieSessionStorage,
	getCookieSessionFromHeader,
} from '~/lib/sessionStorage';
import { Route } from '../../../.react-router/types/app/routes/auth/+types/login2';

export async function loader({ request }: Route.LoaderArgs) {
	// console.log("login route2");

	// const cookieSession = await cookieSessionStorage.getSession(
	// 	request.headers.get('Cookie')
	// );
	// console.log(cookieSession);

	// console.log('login laodre', cookieSession.get('session_id'), 'login loader');
	// if (cookieSession.get('session_id')) {
		return redirect(`/`, {
			headers: {
				'Cache-Control': 'no-store',
			},
		});
	// }
}

export async function action({
	request,
}: Route.ActionArgs): Promise<
	Promise<UNSAFE_DataWithResponseInit<string>> | Promise<Response>
> {
	const formData = await request.formData();

	const username = formData.get('username');
	const password = formData.get('password');
	if (!username || !password) {
		return data('username and password are required', { status: 400 });
	}

	// console.log(username.toString(), password.toString());

	const requestToken = await createRequestToken();
	// console.log(requestToken.data.request_token);
	const grantedRequestToken = await login(
		username.toString(),
		password.toString(),
		requestToken.data.request_token
	);
	// console.log(grantedRequestToken.data.success);
	const sessionRes = await CreateSessionId(grantedRequestToken.data.request_token);

	// console.log('login', sessionRes.data.session_id, 'login ');
	const session = await getCookieSessionFromHeader(request);
	session.set('session_id', sessionRes.data.session_id);
	// await cookieSessionStorage.commitSession(session)

	const sesstionHearder = await cookieSessionStorage.commitSession(session);
	// console.log('sesstrion header', sesstionHearder, 'sesston header');
	return data('done!', {
		headers: {
			'Cache-Control': 'no-store',
			'X-Remix-Revalidate': 'true',
			'Set-Cookie': sesstionHearder,
		},
	});
	// return redirect('/', {
	// 	headers: {
	// 		'Cache-Control': 'no-store',
	// 		'X-Remix-Revalidate':"true",
	// 		'Set-Cookie': await cookieSessionStorage.commitSession(session),
	// 	},
	//
}
const Login2 = () => {
	return (
		<div>

		</div>
	);
};

export default Login2;
