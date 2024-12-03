import React from 'react';
import { Link, useOutletContext } from 'react-router';
import { TMovieSearch, TPersonSearch, TTVShowsSearch } from '~/tyoes';
import { formatDate } from '~/lib/utils';
import FallbackImage from '~/components/fallbackImage';

const TVOutlet = () => {
	const outlet: {
		data: {
			searchedMovies: TMovieSearch;
			searchedTVShows: TTVShowsSearch;
			searchedPersons: TPersonSearch;
		};
		mediaType: any;
	} = useOutletContext();

	return <TVSearchComponent outlet={outlet.data.searchedTVShows.results} />;
};

export default TVOutlet;

export function TVSearchComponent({
	outlet,
}: {
	outlet: TTVShowsSearch['results'];
}) {
	return outlet.map((e, i) => (
		<Link to={`/tv/${e.id}`}
			key={e.id}
			className="flex h-32 overflow-hidden rounded-lg border shadow-md"
		>
			<div className="h-full w-28 overflow-hidden">
				<FallbackImage
					className="rounded-none"
					alt={e.name}
					src={
						e.poster_path
							? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${e.poster_path}`
							: '/images/defaultBGImage.svg'
					}
					// className="h-full w-full object-fill"
					defaultImage="/images/defaultBGImage.svg"
				/>
			</div>

			<div className="flex w-full flex-col justify-between px-3 py-3">
				<div>
					<span className="font-semibold">{e.name}</span>
					<span className="font-light text-gray-500">
						(<>{e.original_name}</>)
					</span>
					<div className="text-sm text-gray-500">
						{formatDate(e.first_air_date)}
					</div>
				</div>
				<p className="line-clamp-2 text-sm">{e.overview}</p>
			</div>
		</Link>
	));
}
