import React from 'react';
import { Link, useOutletContext } from 'react-router';
import { Route } from '../../../.react-router/types/app/routes/search/+types/search_movie';
import { TMovieSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { formatDate } from '~/lib/utils';
import FallbackImage from '~/components/fallbackImage';
import PaginatedComponent from '~/components/PaginatedNavBar';

const searchMovieOutlet = ({ params }: Route.ComponentProps) => {
	const outlet: {
		data: {
			searchedMovies: TMovieSearch;
			searchedTVShows: TTVShowsSearch;
			searchedPersons: TPersonSearch;
		};
		mediaType: any;
	} = useOutletContext();

	return <MovieSearchComponent outlet={outlet.data.searchedMovies} />;
};

export default searchMovieOutlet;

export function MovieSearchComponent({ outlet }: { outlet: TMovieSearch }) {
	// outlet.total_pages = 600;
	return (
		<>
			{outlet.results.map((e, i) => (
				<div key={e.id} className="flex h-32 overflow-hidden rounded-lg shadow">
					<Link to={`/movie/${e.id}`} className="h-full w-32 overflow-hidden">
						<FallbackImage
							alt={e.title}
							src={
								e.poster_path
									? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${e.poster_path}`
									: '/images/defaultBGImage.svg'
							}
							defaultImage="/images/defaultBGImage.svg"
						/>
					</Link>

					<div className="flex w-full flex-col justify-between px-3 py-3">
						<div>
							<Link
								to={`/movie/${e.id}`}
								className="font-semibold hover:text-[#01b4e4]"
							>
								{e.title}
							</Link>
							<span className="font-light text-gray-500">
								(<>{e.original_title}</>)
							</span>
							<div className="text-sm text-gray-500">
								{formatDate(e.release_date)}
							</div>
						</div>
						<p className="line-clamp-2 text-sm">{e.overview}</p>
					</div>
				</div>
			))}

			<div className="flex w-full justify-center gap-2.5">
				<PaginatedComponent
					currentPage={outlet.page}
					totalPages={outlet.total_pages}
				/>
			</div>
		</>
	);
}
