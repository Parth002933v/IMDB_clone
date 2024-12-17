import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useToogle from '~/hooks/useToogle';
import { twMerge } from 'tailwind-merge';

const Disclaimer = () => {
	const { isOpen, toggleIsOpen } = useToogle(false);
	const dis = `	This website is a clone created for educational purposes only. It
						is not intended for actual use, and while you may choose to
						interact with it, we do not recommend using it for any critical or
						real-world applications. Any similarity to the TMDB website is
						purely for learning purposes. Use at your own discretion.`;
	return (
		<div className="w-full px-5 py-1">
			<div
				className={twMerge(
					`justify-betweent flex h-fit w-full flex-row rounded-lg bg-yellow-100 px-5 py-5 text-yellow-800 transition-all duration-300`
				)}
				onClick={() => {
					toggleIsOpen();
				}}
			>
				<div className="flex w-full items-center">
					<SVGDisclaimerICon />
					<strong className="flex-none self-start whitespace-nowrap text-sm font-bold">
						Disclaimer :
					</strong>

					<p className={twMerge('line-clamp-1 pl-2', isOpen && 'line-clamp-none')}>
						{dis}
					</p>
				</div>
				<IoIosArrowDown className="mx-5" scale={30} />
			</div>
		</div>
	);
};

export default Disclaimer;

const SVGCrossIcon = () => {
	return (
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
	);
};

const SVGDisclaimerICon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="mr-3 inline w-[18px] flex-none self-start fill-yellow-500"
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
				<circle cx="64" cy="100.222" r="6" data-original="#fff" />
			</g>
		</svg>
	);
};
