import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigation,
} from 'react-router';

import './app.css';
import NavBar from '~/components/navbar';
import Footer from '~/components/footer';
import { Route } from '../.react-router/types/app/+types/root';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import React, { useEffect, useRef } from 'react';
import { LoaderContext, useLoader } from '~/hooks/useLoader';

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
export default function App() {
	const loaderRef = useRef<LoadingBarRef | null>(null);

	return (
		<LoaderContext.Provider value={{ loaderRef: loaderRef }}>
			<div className={'flex flex-col'}>
				<LoadingBar ref={loaderRef} />
				<NavBar />
				<div className={'flex-1'}>
					<Outlet />
				</div>
				<Footer />
			</div>
		</LoaderContext.Provider>
	);
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</>
		);
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
		return <h1>Unknown Error</h1>;
	}
}
