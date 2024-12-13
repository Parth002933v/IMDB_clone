import React from 'react';
import { Route } from '../../../.react-router/types/app/routes/auth/+types/logout';
import {
	cookieSessionStorage,
	getCookieSessionFromHeader2,
} from '~/lib/sessionStorage';
import { logout } from '~/lib/api';
import { redirect } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await getCookieSessionFromHeader2(request);

	// console.log(cookieSession);

	const sessionId: string | undefined = cookieSession.get('session_id');
	// console.log('===', sessionId, '===');

	if (!sessionId) {
		return redirect('/');
	}
	await logout(sessionId);

	cookieSession.unset('session_id');

	return redirect('/', {
		headers: {
			'Cache-Control': 'no-store',
			'Set-Cookie': await cookieSessionStorage.commitSession(cookieSession),
		},
	});
}

const LogOut = () => <div></div>;

export default LogOut;
