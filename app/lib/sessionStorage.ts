import { createCookieSessionStorage } from 'react-router';

export const cookieSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'session_id',
		// httpOnly: true,
		// sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24,
	},
});

export const getCookieSessionFromHeader = async (request: Request) =>
	await cookieSessionStorage.getSession(request.headers.get('Cookie'));

export async function deleteCookieSession(request: Request) {
	const session = await sessionStorage.getSession(request.headers.get('Cookie'));
	session.unset('session_id');
	return sessionStorage.commitSession(session);
}
