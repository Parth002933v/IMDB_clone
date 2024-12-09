import React from 'react';
import { isMovieDetail, isTVCast, TCastCrew } from '~/tyoes';
import FallbackImage from '~/components/fallbackImage';
import { FaArrowRightLong } from 'react-icons/fa6';

interface CastCrewProps {
	paginatedCast: TCastCrew['cast'];
}

const CastCrew = ({ paginatedCast }: CastCrewProps) => {
	return (
		<div className="w-full space-y-3 pb-5 pt-10 md:max-w-[1360px] md:mx-auto">
			<span className="text-l pl-5 font-semibold">Top Billed Cast</span>
			<div className="flex w-full gap-x-4 overflow-auto pb-3 pl-5">
				{paginatedCast.map((d, i) => {
					const isTV = isTVCast(d);
					return (
						<div
							key={d.id}
							className="flex w-[120px] flex-col rounded-lg pb-5 shadow-md"
						>
							<div className="h-[8.5rem] w-[120px] overflow-hidden">
								<FallbackImage
									className="h-full w-full rounded-none rounded-tl-lg rounded-tr-lg object-fill object-top"
									alt="cast"
									src={
										d.profile_path
											? `https://media.themoviedb.org/t/p/w240_and_h266_face${d.profile_path}`
											: '/images/defaultProfile.svg'
									}
								/>
							</div>

							<p className="w-full px-2 pt-1">
								<span key={d.name} className="text-sm font-medium">
									{d.name}
								</span>
								<br />
								<span key={d.character} className="text-[0.80rem]">
									{d.character}
									{isTV && <>{d.roles.map(m => m.character).join(',')}</>}
									{/*Eddie Brock/ <br /> Venom*/}
								</span>
								<br />
								<span className="text-[0.80rem] text-gray-500">
									{isTV && <>{d.total_episode_count} Episodes</>}
								</span>
							</p>
						</div>
					);
				})}
				<div className="flex items-center justify-center gap-1 whitespace-nowrap px-10 font-semibold">
					View More
					<FaArrowRightLong />
				</div>
			</div>
		</div>
	);
};

export default CastCrew;
