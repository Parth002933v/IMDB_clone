import React from 'react';
import { data, Form, redirect, UNSAFE_DataWithResponseInit } from 'react-router';
import { Route } from '../../../.react-router/types/app/routes/auth/+types/login';
import { createRequestToken, CreateSessionId, login } from '~/lib/api';
import { cookieSessionStorage, getCookieSessionFromHeader } from '~/lib/sessionStorage';

export async function loader({ request }: Route.LoaderArgs) {
	const cookieSession = await cookieSessionStorage.getSession(
		request.headers.get('Cookie')
	);

	if (cookieSession.get('session_id')) {
		return redirect(`/`);
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

	console.log(username.toString(), password.toString());

	const requestToken = await createRequestToken();
	// console.log(requestToken.data.request_token);
	const grantedRequestToken = await login(
		username.toString(),
		password.toString(),
		requestToken.data.request_token
	);
	// console.log(grantedRequestToken.data.success);
	const sessionRes = await CreateSessionId(grantedRequestToken.data.request_token);

	// console.log(sessionRes.data.session_id);
	const session = await getCookieSessionFromHeader(request)
	session.set('session_id', sessionRes.data.session_id);
// await cookieSessionStorage.commitSession(session)

	return redirect('/', {

		headers: {
			'Cache-Control': 'no-store',
			'Set-Cookie': await cookieSessionStorage.commitSession(session),
		},
	});
}

const Login = ({ actionData }: Route.ComponentProps) => {
	// console.log('==action===', actionData, '===action===');

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

			<Form method="POST">
				<CredentialInputField lable={'Username'} inputName={'username'} />

				<CredentialInputField
					lable={'Password'}
					inputName={'password'}
					isPassword={true}
				/>
				<div className="text-red-500">{actionData && actionData.toString()}</div>

				<div className="mt-5 flex w-full items-center justify-center gap-2">
					<button className="rounded-md bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300">
						Login
					</button>
					<div className="text-sm text-[#01B4E4]">Reset password</div>
				</div>
			</Form>
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
