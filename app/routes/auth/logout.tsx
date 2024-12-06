import React from 'react';
import { Route } from '../../../.react-router/types/app/routes/auth/+types/logout';
import {
	deleteCookieSession,
	getCookieSessionFromHeader,
} from '~/lib/sessionStorage';
import { logout } from '~/lib/api';
import { redirect } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await getCookieSessionFromHeader(request);

	const sessionId: string | undefined = cookieSession.get('session_id');
	console.log("===",sessionId, "===");
	if (!sessionId) {
		return redirect('/');
	}
	const res = await logout(sessionId);

const deletedSesstion = 	await deleteCookieSession(request);

	return redirect('/', {});
}

const LogOut = () => <div></div>;

export default LogOut;
