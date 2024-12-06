import { CgMoreO } from 'react-icons/cg';
import RoundedProgressBar from '~/components/prgressbar';

interface MovieCardProps {
	imgurl?: string;
	averageVote?: number;
	movieTitle?: string;
	releaseDate?: string;
}

const MovieCard = ({
	imgurl,
	averageVote = 23,
	movieTitle = '',
	releaseDate = '',
}: MovieCardProps) => {
	return (
		<li
			className={'pointer-events-auto relative cursor-pointer'}
		>
			<div
				className={'relative h-60 w-[9.5rem] overflow-hidden rounded-lg shadow'}
			>
				<img
					alt="poster image"
					src={`https://image.tmdb.org/t/p/w500${imgurl}`}
					className="h-full w-full object-fill object-left-bottom"
				/>
				<CgMoreO
					className="absolute right-0 top-0 mr-2 mt-2 cursor-pointer rounded-full bg-white text-opacity-55 opacity-55 transition-opacity duration-300 hover:bg-[#01b4e5] hover:opacity-80"
					size={23}
				/>
			</div>

			<div className="absolute left-4 top-[11.5rem] mt-8 h-10 w-10">
				<RoundedProgressBar progress={Math.trunc(averageVote * 10)} />
			</div>
			<div className="mt-6">
				<p className="text-sm font-bold">{movieTitle}</p>
				<p className="text-gray text-sm font-light">{releaseDate}</p>
			</div>
		</li>
	);
};

export default MovieCard;
