import { createCookieSessionStorage } from 'react-router';
import { GetUserDetails } from '~/lib/api';

export const cookieSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'session_id',
		// httpOnly: true,
		// sameSite: 'strict',
		// path: '/',
		maxAge: 60 * 60 * 24,
	},
});

export const getCookieSessionFromHeader = async (
	request: Request
): Promise<string> => {
	const session = await cookieSessionStorage.getSession(
		request.headers.get('Cookie')
	);
	return session.get<string>('session_id');
};

export const getCookieSessionFromHeader2 = async (request: Request) => {
	const session = await cookieSessionStorage.getSession(
		request.headers.get('Cookie')
	);
	return session;
};

export async function deleteCookieSession(request: Request) {
	const session = await sessionStorage.getSession(request.headers.get('Cookie'));
	session.unset('session_id');
	return sessionStorage.commitSession(session);
}

export async function getUserFromRequest(request: Request) {
	const cookieSession = await getCookieSessionFromHeader(request);
	const profileDetail = await GetUserDetails(cookieSession);

	// if (profileDetail.data === undefined) {
	// 	return;
	// }
	return profileDetail.data;
}
