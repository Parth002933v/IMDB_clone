import React from 'react';
import { TMovieSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { useOutletContext } from 'react-router';
import FallbackImage from '~/components/fallbackImage';
import PaginatedComponent from '~/components/PaginatedNavBar';

const PeopleOutlet = () => {
	const outlet: {
		data: {
			searchedMovies: TMovieSearch;
			searchedTVShows: TTVShowsSearch;
			searchedPersons: TPersonSearch;
		};
		mediaType: any;
	} = useOutletContext();

	return <PeopleSearchComponent outlet={outlet.data.searchedPersons} />;
};

export default PeopleOutlet;

export function PeopleSearchComponent({ outlet }: { outlet: TPersonSearch }) {
	return (
		<>
			{outlet.results.map((e, i) => (
				<div key={e.id} className="flex h-16 overflow-hidden rounded-lg">
					<div className="h-full w-16 overflow-hidden rounded-lg bg-gray-200">
						<FallbackImage
							alt={e.name}
							src={
								e.profile_path
									? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${e.profile_path}`
									: '/images/defaultProfile.svg'
							}
							defaultImage="/images/defaultProfile.svg"
						/>
					</div>

					<div className="flex h-full w-full flex-col px-3">
						<div className="font-semibold">{e.name}</div>

						<div className="line-clamp-1 flex">
							<span>{e.known_for_department}</span>
							<span className="px-1"> • </span>
							<span className="line-clamp-2 text-sm font-light">
								{e.known_for.map(m => m.title).join(', ')}
							</span>
						</div>
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
