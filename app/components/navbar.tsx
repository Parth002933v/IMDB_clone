import { FaBell, FaPlus, FaSearch } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import { useEffect } from 'react';
import { Link, useNavigation } from 'react-router';
import { useLoader } from '~/hooks/useLoader';
import useToggle from '~/hooks/useToogle';
import { TProfile } from '~/tyoes';
import { Popover } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';

interface NavBarProps {
	profileData?: TProfile;
}

const NavBar = ({ profileData }: NavBarProps) => {
	const { isOpen, toggleIsOpen: setIsOpen } = useToggle(false);
	const topLoader = useLoader();
	const navigation = useNavigation();

	useEffect(() => {
		if (navigation.state === 'loading') {
			topLoader.loaderRef.current?.continuousStart();
		} else if (navigation.state === 'idle') {
			topLoader.loaderRef.current?.complete();
		} else {
			topLoader.loaderRef.current?.complete();
		}
	}, [navigation.state]);

	return (
		<div className="flex h-16 w-full min-w-16 flex-grow items-center justify-center bg-[#032541]">
			<div className="relative flex h-full w-full items-center justify-between px-5 md:max-w-[1350px]">
				<div className="z-[1] flex items-center">
					<TiThMenu
						onClick={() => {
							setIsOpen();
						}}
						className={'invisible h-full cursor-pointer max-md:visible'}
						size={'20'}
						color={'white'}
					/>

					<Link to="/" className="h-[20px] w-[154px] max-md:hidden">
						<img
							alt="desktop logo"
							src="/logo.png"
							className={'h-max w-max'}
						/>
					</Link>
					<div
						className={`top-16 h-full transform bg-[#032541] backdrop-blur-lg transition-transform duration-300 max-md:fixed max-md:left-0 max-md:w-[85%] ${isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'} `}
					>
						<ul className="list-inside list-none pl-6 font-semibold text-white max-md:space-y-3 max-md:pt-6 max-md:text-xl md:flex md:flex-row md:items-center md:space-x-7">
							<li>Movies</li>
							<li>TV Shows</li>
							<li>People</li>
							<li className={'block max-md:hidden'}>More</li>
							<ul className="hidden space-y-3 pt-5 text-sm font-bold text-white/60 max-md:block">
								<li>Contribution Bile</li>
								<li>Discussion</li>
								<li>Leaderboard</li>
								<li>API</li>
								<li>Support</li>
								<li>About</li>
							</ul>
							<ul className="hidden pt-5 text-sm font-bold text-white/60 max-md:block">
								<li>Logout</li>
							</ul>
						</ul>
					</div>
				</div>

				<div className="absolute inset-0 z-[0] mx-auto hidden w-fit items-center justify-center max-md:flex">
					<Link to="/">
						<img
							alt={'mobile logo'}
							src="/logo2.png"
							className={'h-14 w-14 object-contain'}
						/>
					</Link>
				</div>

				<div className="flex h-full items-center gap-3 text-white md:gap-8">
					<FaPlus
						className={'hidden md:block'}
						color={'white'}
						strokeWidth={39}
					/>
					<div className="hidden rounded-sm border px-1 py-0.5 text-sm text-white md:block">
						EN
					</div>

					{profileData ? (
						<>
							<button>
								<FaBell size={17} color={'white'} />
							</button>

							<ProfileComponent


								profileData={profileData} />
						</>
					) : (
						<>
							<ProfileComponent profileData={undefined} />

							<Link to={'/login'} className="font-semibold max-md:hidden">
								Login
							</Link>
							<Link
								to="https://www.themoviedb.org/signup"
								className="font-semibold max-md:hidden"
							>
								Join TMDB
							</Link>
						</>
					)}

					<button
						onClick={() => {
							console.log('seacc');
							const e = document.getElementById(
								'home-search-input'
							) as HTMLInputElement;
							if (e) {
								e.focus();
							}
						}}
					>
						<FaSearch size={20} color={'#01b4e4'} />
					</button>
				</div>
			</div>
		</div>
	);
};
export default NavBar;

interface ProfileComponentProps {
	profileData?: TProfile;
}

// profileDetail {
//   avatar: {
//     gravatar: { hash: '7293bd63864ab0b9efd0fdcaca331ae4' },
//     tmdb: { avatar_path: null }
//   },
//   id: 21670710,
//   iso_639_1: 'en',
//   iso_3166_1: 'IN',
//   name: '',
//   include_adult: false,
//   username: 'parth002933v2'
// }
const ProfileComponent = ({ profileData }: ProfileComponentProps) => {
	const OptionButton = ({ lable, link }: { link: string; lable: string }) => {
		return (
			<Link
				to={link}
				className="w-full px-4 py-2 text-xs font-semibold hover:bg-[#032541] hover:text-white"
			>
				{lable}
			</Link>
		);
	};
	const logoutContent = (
		<div className="z-10 flex w-28 flex-col items-start justify-center py-2 text-start text-sm text-gray-500">
			<Link
				to="/login"
				className="w-full px-3 py-2 hover:bg-[#032541] hover:text-white"
			>
				Login
			</Link>
			<hr className="h-0.5 w-full bg-gray-500" />
			<Link
				to="https://www.themoviedb.org/signup"
				className="w-full px-3 py-2 hover:bg-[#032541] hover:text-white"
			>
				Signup
			</Link>
		</div>
	);

	const loginContent = (
		<div className="z-10 flex flex-col items-start justify-center py-2 text-start text-sm text-gray-500">
			<div className="px-4 py-3">
				<div className="text-xs font-semibold text-black">
					{profileData?.username}
				</div>
				<div className="text-[0.68rem] text-gray-500">View Profile</div>
			</div>

			<hr className="h-0.5 w-full bg-gray-400" />

			<OptionButton link={'#'} lable={'Discussions'} />
			<OptionButton link={'#'} lable={'Lists'} />
			<OptionButton link={'#'} lable={'Ratings'} />
			<OptionButton link={'#'} lable={'Watchlists'} />

			<hr className="h-0.5 w-full bg-gray-400" />

			<OptionButton link={'#'} lable={'EditProfile'} />

			<OptionButton link={'#'} lable={'Settings'} />

			<hr className="h-0.5 w-full bg-gray-400" />
			<OptionButton link={'/logout'} lable={'Logout'} />
		</div>
	);

	return (
		<>
			<Popover


				content={profileData ? loginContent : logoutContent}
				trigger="click"
			>
				<button
					className={twMerge(
						`relative flex h-9 w-9 place-content-center items-center justify-center overflow-hidden rounded-full text-xs font-semibold text-white`
						,!profileData &&'md:hidden'
					)}
				>
					<div key="not-login" className={twMerge('w-full h-full  bg-black',profileData ? 'hidden':'block md:hidden ')}>
						<img
							className={'object-scale-down'}
							alt="profile image placeholder"
							src={`/images/defaultProfile.svg`}
						/>
					</div>

					<div
						key="loged-in"
						className={twMerge(
							`flex place-content-center
							 h-full w-full items-center justify-center bg-purple-700 text-center`,
							profileData ? 'block':'hidden'
						)}
					>
						{profileData?.username[0].toUpperCase()}
					</div>
				</button>
			</Popover>
		</>
	);
};
