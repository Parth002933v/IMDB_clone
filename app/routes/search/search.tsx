import React, { useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { data, Form, NavLink, Outlet } from 'react-router';
import { formatMediaType } from '~/lib/utils';
import { GetSearchResult } from '~/lib/api';
import { TMovieSearch, TMultiSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { twMerge } from 'tailwind-merge';
import { Route } from '../../../.react-router/types/app/routes/search/+types/search';

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const searchParam = url.searchParams;
	const q = searchParam.get('query');
	const pageNo = searchParam.get('page') || undefined;

	if (!q) {
		return data(null, { status: 404 });
	}

	const res = await GetSearchResult<TMultiSearch>(q, 'multi');

	const mediaCategoris = Array.from(
		new Set(res.data.results.map(media => media.media_type))
	);

	const searchedMovies = await GetSearchResult<TMovieSearch>(q, 'movie', pageNo);
	const searchedTVShows = await GetSearchResult<TTVShowsSearch>(q, 'tv', pageNo);
	const searchedPersons = await GetSearchResult<TPersonSearch>(q, 'person', pageNo);

	return data({
		data: {
			searchedMovies: searchedMovies.data,
			searchedTVShows: searchedTVShows.data,
			searchedPersons: searchedPersons.data,
		},
		medialCounts: mediaCategoris,
		query: q,
	});
}

const MultiSearch = ({ loaderData, params, matches }: Route.ComponentProps) => {
	if (loaderData == null || loaderData.medialCounts.length < 1)
		return <>No data found</>;

	// @ts-ignore
	const isSearchRootLayout = matches[2].pathname == '/search/';

	const [input, setInput] = useState(loaderData.query);
	const { searchedMovies, searchedTVShows, searchedPersons } = loaderData.data;
	return (
		<div className="h-max w-full">
			<div className="">
				<SearchBar input={input} setInput={setInput} />
			</div>

			<div className="md:mx-auto md:flex md:max-w-[1350px] md:justify-center md:pt-5">
				<div className="h-full overflow-hidden md:mr-4 md:mt-5 md:w-64 md:rounded-lg md:border">
					<div className="sticky flex h-12 w-full items-center bg-[#01b4e4] px-5 font-semibold text-white md:h-16">
						Search Results
					</div>

					<div className="flex w-full overflow-x-auto max-md:h-12 md:flex-col md:py-4">
						{loaderData.medialCounts.map((media, i) => (
							<NavLink
								to={`${media}?query=${input}`}
								key={i}
								className="flex"
							>
								{({ isActive, isPending, isTransitioning }) => (
									<div
										className={twMerge(
											`flex gap-1.5 px-5 py-3 md:w-full md:justify-between md:hover:bg-gray-100`,
											isSearchRootLayout && i == 0 && 'md:bg-gray-100',
											!isSearchRootLayout && isActive && 'md:bg-gray-100'
										)}
									>
										<span
											className={twMerge(
												'whitespace-nowrap text-sm max-md:font-semibold',
												isSearchRootLayout &&
													i == 0 &&
													'max-md:text-[#01b4e4] md:font-semibold',
												!isSearchRootLayout &&
													isActive &&
													'max-md:text-[#01b4e4] md:font-semibold'
											)}
										>
											{formatMediaType(media)}
										</span>
										<div
											className={twMerge(
												'flex items-center rounded-md border px-1.5 py-0 text-center text-xs font-light',
												isSearchRootLayout &&
													i == 0 &&
													'max-md:border-[#01b4e4] md:font-semibold',
												!isSearchRootLayout &&
													isActive &&
													'max-md:border-[#01b4e4] md:font-semibold'
											)}
										>
											{(() => {
												switch (media) {
													case 'movie':
														return <>{searchedMovies.total_results}</>;
													case 'tv':
														return (
															<>{searchedTVShows.total_results}</>
														);
													case 'person':
														return (
															<>{searchedPersons.total_results}</>
														);
												}
											})()}
										</div>
									</div>
								)}
							</NavLink>
						))}
					</div>
				</div>
				<hr className="h-1 md:hidden" />
				<div className="mt-5 flex-1 space-y-4 px-5 pb-5">
					<Outlet
						context={{
							data: loaderData.data,
							mediaType: loaderData.medialCounts,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default MultiSearch;

interface SearchBarProps {
	setInput: (value: string) => void;
	input: string;
}

const SearchBar = ({ setInput, input }: SearchBarProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.focus();
		}
	};
	return (
		<Form
			action="#"
			method="GET"
			className="flex h-12 w-full items-center gap-3 px-5 md:border-b"
		>
			<IoSearchSharp className="h-4 w-4" />
			<input
				ref={inputRef}
				name="query"
				value={input}
				onChange={e => setInput(e.target.value)}
				className="h-full flex-1 font-semibold text-gray-500 outline-none placeholder:text-sm placeholder:italic"
				placeholder="Serach"
			/>
			<button onClick={handleClear} type="button" className="p-1 active:bg-gray-500/10">
				<IoMdClose className="font-bold text-gray-600" />
			</button>
		</Form>
	);
};
