import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	redirectDocument,
	Scripts,
	ScrollRestoration,
	UNSAFE_DataWithResponseInit,
} from 'react-router';

import './app.css';
import NavBar from '~/components/navbar';
import Footer from '~/components/footer';
import { Route } from '../.react-router/types/app/+types/root';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import React, { useRef } from 'react';
import { LoaderContext } from '~/hooks/useLoader';
import {
	createRequestToken,
	CreateSessionId,
	GetUserDetails,
	login,
} from '~/lib/api';
import {
	cookieSessionStorage,
	getCookieSessionFromHeader,
} from '~/lib/sessionStorage';
import { axios } from '~/lib/apiHandler';
import { TBaseApiResponseSchema } from '~/tyoes';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '~/components/ui/accordion';

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
	// console.log('in root loader');
	const cookieSession = await getCookieSessionFromHeader(request);

	// console.log('in root loader=>', cookieSession);
	// const id = axios.interceptors.request.use(async config => {
	// 	const url = new URL(config.url || '');
	// 	url.searchParams.append('session_id', cookieSession.get('session_id'));
	// 	config.url = url.toString();
	// 	return config;
	// });
	// console.log(
	// 	'loader in navbar',
	// 	cookieSession.get('session_id'),
	// 	'====loader in navbar'
	// );

	const profileDetail = await GetUserDetails(cookieSession);
	// console.log('profileDetail in root loader', profileDetail.data);
	// console.log('profileDetail', profileDetail, 'profileDetail');

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

	if (!profileDetail || !profileDetail.data) {
		return undefined;
	}

	// axios.interceptors.request.eject(id);
	return profileDetail.data;
}

export default function App({ loaderData, matches }: Route.ComponentProps) {
	const loaderRef = useRef<LoadingBarRef | null>(null);

	const dis = `	This website is a clone created for educational purposes only. It
						is not intended for actual use, and while you may choose to
						interact with it, we do not recommend using it for any critical or
						real-world applications. Any similarity to the TMDB website is
						purely for learning purposes. Use at your own discretion.`;
	// console.log(matches);
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<LoaderContext.Provider value={{ loaderRef: loaderRef }}>
				<div className={'h-dvh'}>
					<LoadingBar ref={loaderRef} />
					<NavBar profileData={loaderData} />

					{/*//======*/}
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								<div
									className="relative flex items-start rounded-lg bg-yellow-100 p-4 text-yellow-800 max-sm:flex-col"
									role="alert"
								>
									<div className="flex items-center max-sm:mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="mr-3 inline w-[18px] fill-yellow-500"
											viewBox="0 0 128 128"
										>
											<path
												d="M56.463 14.337 6.9 106.644C4.1 111.861 8.173 118 14.437 118h99.126c6.264 0 10.338-6.139 7.537-11.356L71.537 14.337c-3.106-5.783-11.968-5.783-15.074 0z"
												data-original="#fad271"
											/>
											<g fill="#fff">
												<path
													d="M64 31.726a5.418 5.418 0 0 0-5.5 5.45l1.017 44.289A4.422 4.422 0 0 0 64 85.726a4.422 4.422 0 0 0 4.482-4.261L69.5 37.176a5.418 5.418 0 0 0-5.5-5.45z"
													data-original="#fff"
												/>
												<circle
													cx="64"
													cy="100.222"
													r="6"
													data-original="#fff"
												/>
											</g>
										</svg>
										<strong className="text-sm font-bold">
											Disclaimer
										</strong>
									</div>

									<span className="ml-4 mr-8 line-clamp-1 block text-sm max-sm:ml-0 max-sm:mt-2 sm:inline">
										{dis}
									</span>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="absolute right-4 top-1/2 w-7 -translate-y-1/2 cursor-pointer rounded-lg fill-yellow-500 p-2 transition-all hover:bg-yellow-200"
										viewBox="0 0 320.591 320.591"
									>
										<path
											d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
											data-original="#000000"
										/>
										<path
											d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
											data-original="#000000"
										/>
									</svg>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<p className="w-full bg-red-700"></p>
					<div className={'h-max'}>
						<Outlet context={loaderData} />
					</div>
					<Footer />
				</div>
			</LoaderContext.Provider>
		</React.Suspense>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const APIError = TBaseApiResponseSchema.safeParse(error || '');
	if (APIError.success) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
				<div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
					<h1 className="mb-4 text-4xl font-bold text-red-600">
						Error {APIError.data.status_code}
					</h1>
					<h2 className="mb-4 text-xl text-gray-700">
						{APIError.data.status_message}
					</h2>
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
		);
	} else if (isRouteErrorResponse(error)) {
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
		return <h1>"unknown"</h1>;
	}
	// } else if(TApiErrorSchema) {
	// 	return <h1>{error.status_message}</h1>;
	// }
}
