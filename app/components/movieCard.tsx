import { CgMoreO } from 'react-icons/cg';
import RoundedProgressBar from '~/components/prgressbar';

interface MovieCardProps {
	imgurl?: string;
	averageVote?: number;
}

const MovieCard = ({ imgurl = 'as', averageVote = 23 }: MovieCardProps) => {
	return (
		<li
			className={'pointer-events-auto relative cursor-pointer'}
			onClick={() => {
				console.log('clicked');
			}}
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

			<div className="absolute left-4 top-[11.5rem] h-12 w-12">
				<RoundedProgressBar progress={Math.trunc(averageVote * 10)} />
			</div>
			<div className="pt-3">
				<p className="text-lg font-bold">Day and Night</p>
				<p className="font-thin">Aug 30, 2017</p>
			</div>
		</li>
	);
};

export default MovieCard;
