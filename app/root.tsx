import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';

import './app.css';
import NavBar from '~/components/navbar';
import Footer from '~/components/footer';
import { Route } from '../.react-router/types/app/+types/root';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import React, { useRef } from 'react';
import { LoaderContext } from '~/hooks/useLoader';
import { GetUserDetails } from '~/lib/api';
import { cookieSessionStorage } from '~/lib/sessionStorage';
import { axios } from '~/lib/apiHandler';
import { TApiErrorSchema, TProfile } from '~/tyoes';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<Meta />
			<Links />
		</head>
		<body>
		{children}
		<ScrollRestoration />
		<Scripts />
		</body>
		</html>
	);
}

// export default function App() {
// 	return <Outlet />;
// }
// export async function loader({request}:Route.LoaderArgs){
//
//
//
// }

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await cookieSessionStorage.getSession(
		request.headers.get('Cookie'),
	);

	const id = axios.interceptors.request.use(async config => {
		const url = new URL(config.url || '');
		url.searchParams.append('session_id', cookieSession.get('session_id'));
		config.url = url.toString();
		return config;
	});
	console.log(
		'loader in navbar',
		cookieSession.get('session_id'),
		'====loader in navbar'
	);

	const profileDetail = await GetUserDetails();
	console.log('profileDetail', profileDetail.data, 'profileDetail');

	//
	// const unAuthorizedRequestError = TApiErrorSchema.safeParse(profileDetail.data);
	// if (unAuthorizedRequestError.success) {
	// 	console.log(
	// 		'profileDetail',
	// 		unAuthorizedRequestError.data.status_message,
	// 		'profileDetail'
	// 	);
	// 	return undefined;
	// }

	axios.interceptors.request.eject(id);
	return profileDetail?.data;
}

export default function App({ loaderData }: Route.ComponentProps) {
	const loaderRef = useRef<LoadingBarRef | null>(null);

	return (
		<LoaderContext.Provider value={{ loaderRef: loaderRef }}>
			<div className={'h-dvh'}>
				<LoadingBar ref={loaderRef} />
				<NavBar profileData={loaderData} />
				<div className={'h-max'}>
					<Outlet />
				</div>
				<Footer />
			</div>
		</LoaderContext.Provider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const APIError = TApiErrorSchema.safeParse(error || "");
	if (APIError.success) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
				<div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
					<h1 className="mb-4 text-4xl font-bold text-red-600">
						Error {APIError.data.status_code}
					</h1>
					<h2 className="mb-4 text-xl text-gray-700">{APIError.data.status_message}</h2>
					{/*<p className="mb-6 text-lg text-gray-600">{APIError.data.}</p>*/}

					<div className="flex justify-center">
						<button
							onClick={() => window.location.reload()}
							className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		)}else if (isRouteErrorResponse(error)) {

			return (
				<>
					<h1>
						{error.status} {error.statusText}
					</h1>
					<p>{error.data}</p>
				</>
			)
		} else if (error instanceof Error) {
			return (
				<div>
					<h1>Error</h1>
					<p>{error.message}</p>
					<p>The stack trace is:</p>
					<pre>{error.stack}</pre>
				</div>
			);

	} else {
		return <h1>Unknown Error</h1>
	}
	// } else if(TApiErrorSchema) {
	// 	return <h1>{error.status_message}</h1>;
	// }
}
