import React from 'react';
import { data, Link, Outlet } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { Route } from '../../../.react-router/types/app/routes/profile/+types/profile';
import { GetUserDetails } from '~/lib/api';
import { IoMdArrowDropdown } from 'react-icons/io';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export async function loader({ request, params }: Route.LoaderArgs) {
	// const cookieSession = await cookieSessionStorage.getSession(
	// 	request.headers.get('Cookie')
	// );
	//
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

	const profileDetail = await GetUserDetails();
	// console.log(profileDetail);

	if (!profileDetail.data) {
		throw data('Invalid User Profile', { status: 404 });
	} else if (profileDetail.data.username !== params.username) {
		throw data('Invalid User Profile', { status: 404 });
	}
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

	// axios.interceptors.request.eject(id);
	return profileDetail.data;
}

type FilterItem = {
	lable: string;
	link?: string;
};

type FilterCategory = {
	key: number;
	lable: string;
	link?: string;
	items: FilterItem[];
};

const FilterList: FilterCategory[] = [
	{
		key: 1,
		lable: 'Favorites',
		link: './favorites',
		items: [{ lable: 'Movies' }, { lable: 'TV Shows' }],
	},
	{
		key: 2,
		lable: 'Recommendations',
		items: [
			{
				lable: 'Movies',
				link: './recommendations',
			},
			{
				lable: 'TV Shows',
				link: './recommendations/tv',
			},
		],
	},
	{
		key: 3,
		lable: 'Ratings',
		items: [
			{
				lable: 'Movies',
				link: './ratings',
			},
			{
				lable: 'TV Shows',
				link: './ratings/tv',
			},
		],
	},
	{
		key: 4,
		lable: 'Watchlist',
		items: [
			{
				lable: 'Movies',
				link: './watchlist',
			},
			{
				lable: 'TV Shows',
				link: './watchlists/tv',
			},
		],
	},
];

const Profile = ({ loaderData }: Route.ComponentProps) => {
	// const outletData: TProfile = useOutletContext();

	const profile = loaderData;

	return (
		<div className="h-full w-full">
			<div
				key="profile"
				className="mx-auto flex h-28 max-w-[1350px] items-center justify-center gap-3 bg-red-700"
			>
				<button
					key="avatar"
					className={twMerge(
						`relative flex h-20 w-20 place-content-center items-center justify-center overflow-hidden rounded-full text-xs font-semibold text-white`,
						!profile && 'md:hidden'
					)}
				>
					<div
						key="not-login"
						className={twMerge(
							'h-full w-full bg-black',
							profile ? 'hidden' : 'block md:hidden'
						)}
					>
						<img
							className={'object-scale-down'}
							alt="profile image placeholder"
							src={`/images/defaultProfile.svg`}
						/>
					</div>

					<div
						key="loged-in"
						className={twMerge(
							`flex h-full w-full place-content-center items-center justify-center bg-purple-700 text-center text-xl`,
							profile ? 'block' : 'hidden'
						)}
					>
						{profile?.username[0].toUpperCase()}
					</div>
				</button>

				<div key="username" className="text-2xl font-semibold text-white">
					{profile.username}
				</div>
			</div>
			<div
				key="menu"
				className="flex h-10 w-full gap-2 overflow-scroll border-b font-light"
			>
				{FilterList.map(item => (
					<DropdownMenu key={item.key}>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center justify-center gap-2 px-2 py-3">
								{item.lable}
								{item.items.length > 0 && (
									<>
										<IoMdArrowDropdown />{' '}
									</>
								)}
							</div>
						</DropdownMenuTrigger>

						{item.items.length > 0 && (
							<DropdownMenuContent>
								{item.items.map(i => (
									<DropdownMenuItem key={i.lable}>
										<Link to={i.link|| "#"}	>
											{i.lable}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						)}
					</DropdownMenu>
				))}
			</div>

			<Outlet  context={{isRootRout:true}}/>
		</div>
	);
};

export default Profile;