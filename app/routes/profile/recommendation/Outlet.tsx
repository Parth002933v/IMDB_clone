import React from 'react';
import { Link, NavLink, Outlet, useOutletContext } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { Route } from '../../../../.react-router/types/app/routes/profile/recommendation/+types/Outlet';

export function loader({ params }: Route.LoaderArgs) {}

const ProfileOutlet = ({matches}: Route.ComponentProps) => {
	const {
		isRootRout = false,
		isRecommendation = false,
	}: {
		isRootRout: boolean;
		isRecommendation: boolean;
	} = useOutletContext();
	// console.log(isRootRout, isRecommendation);

	console.log(matches);
	return (
		<div className="h-full w-full px-5 py-5">
			<div className="flex w-full justify-between">
				<div>My Recommendation</div>
				<div className="flex gap-3 font-light">
					<NavLink to={'./recommendations'}>
						{({ isActive, isPending, isTransitioning }) => (
							<div
								className={twMerge(
									(isRootRout && isActive) && 'border-b-4 border-[#01b4e4]'
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
