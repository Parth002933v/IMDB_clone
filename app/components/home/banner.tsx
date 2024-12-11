import React from 'react';
import { Form } from 'react-router';

const Banner = ({ path }: { path?: string }) => {
	return (
		<div
			id="banner"
			className="relative flex h-[23rem] flex-col justify-center bg-center text-white"
		>
			<img
				className="absolute z-[-1] h-full w-full bg-blue-700 object-cover"
				src={`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)${path}`}
				alt="banner image"
			/>

			<div className="px-9">
				<h1 className="text-5xl font-bold">Welcome</h1>
				<p className="text-3xl font-semibold">
					Millions of movies, TV shows and people to discover. Explore now.
				</p>

				<div className="relative mt-9 flex h-12 items-center overflow-hidden rounded-full bg-white active:outline active:outline-[#03b6e2]">
					<Form action={`./search`} method="GET" className="w-full">
						<input
							id="home-search-input"
							name="query"
							className="w-full border-none pl-5 pr-32 text-lg text-black placeholder-black/80 outline-0"
							placeholder={'Search for movie,tv shows, person...'}
						/>
						<button className="absolute bottom-0 right-0 top-0 rounded-full bg-gradient-to-r from-[#1cd3ad] to-[#03b6e2] px-8 duration-300 hover:text-black">
							Search
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Banner;
