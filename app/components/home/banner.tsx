import React from 'react';

const Banner = () => {
	return (
		<div
			id="banner"
			className='flex h-[23rem] flex-col justify-center bg-[url("/sample/banner.png")] bg-cover bg-center px-9 text-white'
		>
			<h1 className="text-5xl font-bold">Welcome</h1>
			<p className="text-3xl font-semibold">
				Millions of movies, TV shows and people to discover. Explore now.
			</p>

			<div className="relative mt-9 flex h-12 items-center overflow-hidden rounded-full bg-white active:outline active:outline-[#03b6e2]">
				<input
					className="w-full border-none pl-5 text-lg text-black placeholder-black/80 outline-0"
					placeholder={'Search for movie,tv shows, person...'}
				/>
				<button className="absolute bottom-0 right-0 top-0 rounded-full bg-gradient-to-r from-[#1cd3ad] to-[#03b6e2] px-8 duration-300 hover:text-black">
					Search
				</button>
			</div>
		</div>
	);
};

export default Banner;
