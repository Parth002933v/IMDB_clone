import { FaBell, FaPlus, FaSearch } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { Link, useNavigation } from 'react-router';
import { useLoader } from '~/hooks/useLoader';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

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
		<div className="flex h-16 w-full min-w-16 items-center justify-center bg-[#032541]">
			<div className="relative flex h-full w-full items-center justify-between px-5 md:max-w-[1350px]">
				<div className="z-10 flex items-center">
					<TiThMenu
						onClick={() => {
							setIsOpen(!isOpen);
						}}
						className={'hidden max-md:block'}
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

				<div className="absolute inset-0 hidden cursor-pointer items-center justify-center max-md:flex">
					<Link to="/">
						<img
							alt={'mobile logo'}
							src="/logo2.png"
							className={'h-14 w-14 object-contain'}
						/>
					</Link>
				</div>

				<div className={'flex items-center gap-3 md:gap-8'}>
					<FaPlus
						className={'hidden md:block'}
						color={'white'}
						strokeWidth={39}
					/>
					<div className="hidden rounded-sm border px-1 py-0.5 text-sm text-white md:block">
						EN
					</div>
					<button>
						<FaBell size={17} color={'white'} />
					</button>

					<div className="h-9 w-9 place-content-center rounded-full bg-purple-700 text-center text-xs font-semibold text-white">
						P
					</div>

					<button
						onClick={() => {
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
