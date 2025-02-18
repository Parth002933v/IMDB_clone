import React from 'react';
import { Link, useOutletContext } from 'react-router';
import { TMovieSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { formatDate } from '~/lib/utils';
import FallbackImage from '~/components/fallbackImage';
import PaginatedComponent from '~/components/PaginatedNavBar';
import { VERCEL_BASE_URL } from '~/lib/constant';

const TVOutlet = () => {
	const outlet: {
		data: {
			searchedMovies: TMovieSearch;
			searchedTVShows: TTVShowsSearch;
			searchedPersons: TPersonSearch;
		};
		mediaType: any;
	} = useOutletContext();

	return <TVSearchComponent outlet={outlet.data.searchedTVShows} />;
};

export default TVOutlet;

export function TVSearchComponent({ outlet }: { outlet: TTVShowsSearch }) {
	return (
		<>
			{outlet.results.map((e, i) => (
				<div
					key={e.id}
					className="flex h-32 overflow-hidden rounded-lg border shadow-md"
				>
					<Link to={`/tv/${e.id}`} className="h-full w-28 overflow-hidden">
						<FallbackImage
							className="rounded-none"
							alt={e.name}
							src={
								e.poster_path
									? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${e.poster_path}`
									: `${VERCEL_BASE_URL}/images/defaultBGImage.svg`
							}
							defaultImage={`${VERCEL_BASE_URL}/images/defaultBGImage.svg`}
						/>
					</Link>

					<div className="flex w-full flex-col justify-between px-3 py-3">
						<div>
							<Link
								to={`/tv/${e.id}`}
								className="font-semibold hover:text-[#01b4e4]"
							>
								{e.name}
							</Link>
							<span className="font-light text-gray-500">
								(<>{e.original_name}</>)
							</span>
							<div className="text-sm text-gray-500">
								{formatDate(e.first_air_date)}
							</div>
						</div>
						<p className="line-clamp-2 text-sm">{e.overview}</p>
					</div>
				</div>
			))}

			<div className="flex w-full justify-center gap-2.5">
				<PaginatedComponent
					totalPages={outlet.total_pages}
					currentPage={outlet.page}
				/>
			</div>
		</>
	);
}
