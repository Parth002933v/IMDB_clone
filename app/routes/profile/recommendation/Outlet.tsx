import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/Outlet';

const ProfileOutlet = ({ matches, params }: Route.ComponentProps) => {
	const currentPath = matches[matches.length - 1]?.pathname;

	const isRootProfileAndRecomendation =
		currentPath == `/u/${params.username}/` ||
		currentPath == `/u/${params.username}/recommendations/movie`;

	return (
		<div className="flex h-full w-full flex-col gap-3 py-5">
			<div className="flex w-full justify-between px-5">
				<div className="font-bold ">My Recommendations</div>

				<div className="flex gap-3 font-light">
					<NavLink to={'./recommendations/movie'}>
						{({ isActive, isPending, isTransitioning }) => (
							<div
								className={twMerge(
									// 'border-none',
									isRootProfileAndRecomendation &&
										`border-b-4 border-[#01b4e4]`,
									!isRootProfileAndRecomendation &&
										!isActive &&
										`border-none`
								)}
							>
								Movie
							</div>
						)}
					</NavLink>

					<NavLink to={'./recommendations/tv'}>
						{({ isActive, isPending, isTransitioning }) => (
							<div
								className={twMerge(
									isActive && 'border-b-4 border-[#01b4e4]'
								)}
							>
								TV
							</div>
						)}
					</NavLink>
				</div>
			</div>

			<Outlet  />
		</div>
	);
};

export default ProfileOutlet;

// [
//   {
//     id: 'root',
//     pathname: '/',
//     params: { username: 'parth002933v2' },
//     data: {
//       avatar: [Object],
//       id: 21670710,
//       iso_639_1: 'en',
//       iso_3166_1: 'IN',
//       name: '',
//       include_adult: false,
//       username: 'parth002933v2'
//     },
//     handle: undefined
//   },
//   {
//     id: 'routes/profile/profile',
//     pathname: '/u/parth002933v2',
//     params: { username: 'parth002933v2' },
//     data: {
//       avatar: [Object],
//       id: 21670710,
//       iso_639_1: 'en',
//       iso_3166_1: 'IN',
//       name: '',
//       include_adult: false,
//       username: 'parth002933v2'
//     },
//     handle: undefined
//   },
//   {
//     id: 'routes/profile/recommendation/Outlet',
//     pathname: '/u/parth002933v2/',
//     params: { username: 'parth002933v2' },
//     data: undefined,
//     handle: undefined
//   },
//   {
//     id: 'routes/profile/index',
//     pathname: 'k',
//     params: { username: 'parth002933v2' },
//     data: null,
//     handle: undefined
//   }
// ]

// [
//   {
//     id: 'root',
//     pathname: '/',
//     params: { username: 'parth002933v2' },
//     data: {
//       avatar: [Object],
//       id: 21670710,
//       iso_639_1: 'en',
//       iso_3166_1: 'IN',
//       name: '',
//       include_adult: false,
//       username: 'parth002933v2'
//     },
//     handle: undefined
//   },
//   {
//     id: 'routes/profile/profile',
//     pathname: '/u/parth002933v2',
//     params: { username: 'parth002933v2' },
//     data: {
//       avatar: [Object],
//       id: 21670710,
//       iso_639_1: 'en',
//       iso_3166_1: 'IN',
//       name: '',
//       include_adult: false,
//       username: 'parth002933v2'
//     },
//     handle: undefined
//   },
//   {
//     id: 'routes/profile/recommendation/Outlet',
//     pathname: '/u/parth002933v2/',
//     params: { username: 'parth002933v2' },
//     data: undefined,
//     handle: undefined
//   },
//   {
//     id: 'routes/profile/recommendation/MovieRecommendation',
//     pathname: '',
//     params: { username: 'parth002933v2' },
//     data: undefined,
//     handle: undefined
//   }
// ]