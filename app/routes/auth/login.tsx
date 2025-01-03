import React from 'react';
import {
	data,
	redirect,
	UNSAFE_DataWithResponseInit,
	useFetcher,
} from 'react-router';
import { Route } from '../../../.react-router/types/app/routes/auth/+types/login';
import { createRequestToken, CreateSessionId, login } from '~/lib/api';
import {
	cookieSessionStorage,
	getCookieSessionFromHeader2,
} from '~/lib/sessionStorage';

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await cookieSessionStorage.getSession(
		request.headers.get('Cookie')
	);
	// console.log(cookieSession);

	// console.log('login laodre', cookieSession.get('session_id'), 'login loader');
	if (cookieSession.get('session_id')) {
		return redirect(`/`, {
			headers: {
				'Cache-Control': 'no-store',
			},
		});
	}
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
	const session = await getCookieSessionFromHeader2(request);
	session.set('session_id', sessionRes.data.session_id);
	// await cookieSessionStorage.commitSession(session)

	const sesstionHearder = await cookieSessionStorage.commitSession(session);
	// console.log('sesstrion header', sesstionHearder, 'sesston header');
	// return data('done!', {
	// 	headers: {
	// 		'Cache-Control': 'no-store',
	// 		'Set-Cookie': sesstionHearder,
	// 	},
	// });
	return redirect('/', {
		headers: {
			'Cache-Control': 'no-store',
			'X-Remix-Revalidate': 'true',
			'Set-Cookie': sesstionHearder,
		},
	});
}

const Login = ({ actionData }: Route.ComponentProps) => {
	let fetcher = useFetcher();

	// useEffect(() => {
	// 	if (fetcher.state === 'submitting') {
	// 		fetcher.load('/');
	// 	}
	// }, [fetcher.state]);
	//
	return (
		<div className="mx-auto h-full w-full flex-grow px-5 py-5 md:max-w-[1350px]">
			<div className="mb-3 text-xl font-semibold">Login to your account</div>
			<p className="mb-3 text-sm">
				In order to use the editing and rating capabilities of TMDB, as well as
				get personal recommendations you will need to login to your account. If
				you do not have an account, registering for an account is free and
				simple. <span className="cursor-pointer text-[#01B4E4]">Click here</span>{' '}
				to get started.
			</p>
			<p className="mb-7 text-sm">
				If you signed up but didn't get your verification email,{' '}
				<span className="cursor-pointer text-[#01B4E4]">Click here</span> to have
				it resent.
			</p>

			<fetcher.Form action="#" method="post">
				<CredentialInputField
					key="username"
					lable={'Username'}
					inputName={'username'}
				/>

				<CredentialInputField
					key="password"
					lable={'Password'}
					inputName={'password'}
					isPassword={true}
				/>

				<div className="text-red-500">{fetcher && fetcher.data}</div>

				<div className="mt-5 flex w-full items-center justify-center gap-2">
					<button
						disabled={fetcher.state === 'loading'}
						className="rounded-md bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300"
					>
						Login
						{fetcher.state === 'loading' && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18px"
								fill="#fff"
								className="ml-2 inline animate-spin"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
									data-original="#000000"
								/>
							</svg>
						)}
					</button>
					<div className="text-sm text-[#01B4E4]">Reset password</div>
				</div>
			</fetcher.Form>
		</div>
	);
};

export default Login;

const CredentialInputField = ({
	lable,
	inputName,

	isPassword = false,
}: {
	lable: string;
	inputName: string;
	isPassword?: boolean;
}) => {
	return (
		<div className="flex flex-col">
			<label className="text-sm font-normal">{lable}</label>
			<input
				// required
				type={!isPassword ? 'text' : 'password'}
				className="h-10 rounded-md border border-gray-300 px-3 outline-[#01B4E4]"
				name={inputName}
			/>
		</div>
	);
};
