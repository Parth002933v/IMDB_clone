import React from 'react';
import { twMerge } from 'tailwind-merge';
import RoundedProgressBar from '~/components/prgressbar';
import { GetCastCrewByMovieId, GetMovieTVById } from '~/lib/api';
import { convertMinutes, filterCrewByJobs } from '~/lib/utils';
import { FaArrowRightLong } from 'react-icons/fa6';
import { data, isRouteErrorResponse, Outlet } from 'react-router';
import getColors from 'get-image-colors';
import { isMovieDetail } from '~/tyoes';
import FallbackImage from '~/components/fallbackImage';
import DetailBanner from '~/components/movie_tv_detail/detailBanner';
import CastCrew from '~/components/movie_tv_detail/CastCrews';
import { VERCEL_BASE_URL } from '~/lib/constant';

// import { Swatch } from '@vibrant/color';

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}

export async function loader({ params }: Route.LoaderArgs) {
	// console.log('mediaDeatl', params);
	if (!(params.mediaType === 'tv' || params.mediaType === 'movie')) {
		throw data('not page found', { status: 404 });
	}

	const MovieId = params.id.split('-')[0];

	const movieDetail = await GetMovieTVById(MovieId, params.mediaType);
	const CastCrew = await GetCastCrewByMovieId(MovieId, params.mediaType);

	const pagginatedCast = CastCrew.data.cast.slice(0, 10);
	const importantCrews = filterCrewByJobs(CastCrew.data.crew);

	// const fullImage = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.data.backdrop_path}`;

	// console.log(fullImage);

	// Function to extract the primary color from an image
	async function getPrimaryColor(imageUrl: string) {
		try {
			// Get colors from image
			const colors = await getColors(imageUrl);

			// Return the dominant color (first color in the array)
			return {
				primary: colors[4].rgb().join(','),
				darken: colors[4].darken().rgb().join(','),
			}; // returns RGB in the format: "r,g,b"
		} catch (error) {
			console.error('Error extracting primary color:', error);
			return { primary: '255,255,255', darken: '0,0,0' }; // fallback to white if there's an error
		}
	}

	// const primaryColor = await getPrimaryColor(fullImage);

	return data({
		movieDetail: movieDetail.data,
		paginatedCast: pagginatedCast,
		importantCrews: importantCrews,
		colorPalette: '',
	});
}

export async function clientLoader2({ serverLoader }: Route.ClientLoaderArgs) {
	// const serverData = await serverLoader();
	//
	// const fullImage = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${serverData.movieDetail.poster_path}`;
	// let colorPalette = '255,255,255';  // Default to white if color extraction fails
	//
	// console.log(fullImage);
	//
	// const getColorPalette = (): Promise<string> => {
	// 	return new Promise((resolve, reject) => {
	// 		const img = new Image();
	// 		img.crossOrigin = 'Anonymous'; // Enable CORS for cross-origin images
	//
	// 		img.onload = () => {
	// 			console.log('Image loaded');
	// 			const colorThief = new ColorThief();
	// 			const palette = colorThief.getPalette(img, 6); // Get 6 colors from the image
	// 			const primaryColor:string = palette[0].join(','); // Take the first color from the palette
	// 			console.log('Extracted color palette:', primaryColor);
	// 			resolve(primaryColor); // Resolve the promise with the color palette
	// 		};
	//
	// 		img.onerror = e => {
	// 			console.log('Error loading image:', e);
	// 			reject('255,255,255'); // Reject with a default color (white)
	// 		};
	//
	// 		img.src = fullImage; // Start loading the image
	// 	});
	// };
	//
	// try {
	// 	// Wait for the image to load and color palette to be extracted
	// 	const primaryColor:string = await getColorPalette();
	// 	// Return the data only after the color palette is extracted
	// 	return data({ ...serverData, primary: primaryColor });
	// } catch (error) {
	// 	// Fallback if image loading or palette extraction fails
	// 	console.log('Using fallback color:', error);
	// 	return data({ ...serverData, primary: '255,255,255' }); // Use fallback (white) in case of error
	// }
}

const toHex = (rgb: any) => {
	let hex = Number(rgb).toString(16);
	if (hex.length < 2) {
		hex = '0' + hex;
	}

	return hex;
};

const MediaDetail = ({ loaderData }: Route.ComponentProps) => {
	const { movieDetail, importantCrews, paginatedCast, colorPalette } = loaderData;

	const isMovie = isMovieDetail(movieDetail);

	const movie = movieDetail.data
	const releaseYear = isMovie
		? movieDetail.release_date.split('-')[0]
		: movieDetail.first_air_date.split('-')[0];

	const runtime = isMovie
		? `${convertMinutes(movieDetail.runtime).hours}h ${convertMinutes(movieDetail.runtime).minutes}m`
		: null;

	// const [colorPalette, setColorPalette] = useState<any>(null);

	// const fullImage = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`;
	// useEffect(() => {
	// 	let img = new Image();
	// 	img.crossOrigin = 'Anonymous';
	// 	img.onload = () => {
	// 		console.log('image loaded');
	// 		const colorThief = new ColorThief();
	// 		const colorPalette = colorThief.getPalette(img, 6);
	// 		setColorPalette(colorPalette);
	// 	};
	// 	img.onerror = e => {
	// 		console.log('error', e);
	// 		setColorPalette(null);
	// 	};
	// 	console.log('===fllimage===', fullImage, '===fullimage===');
	// 	img.src = fullImage;
	// }, [movieDetail.poster_path]);
	// console.log('===colorpallate===', colorPalette, '======color pallate===');


	return (
		<div className="h-full w-full">
			{/*<>{colorPalette && colorPalette[0].join(',')}</>*/}
			{/*<>{colorPalette.primary}</>*/}
			{/*banner and overview*/}
			<DetailBanner key="banner" detailMediaData={movieDetail.data} importantCrews={importantCrews}/>
			{/*<div key="banner" className={twMerge(`relative`)}>*/}
			{/*	<div className="h-full w-[100vw] min-w-[100vw]">*/}
			{/*		<div className="relative h-[calc(100vw/2.222222)] w-full min-w-[100vw] overflow-hidden">*/}
			{/*			<div*/}
			{/*				className={twMerge(*/}
			{/*					'h-full w-full min-w-full bg-cover bg-no-repeat',*/}
			{/*					'bg-[calc((((100vw/2.222222)-20px)/1.5)/2)_0]',*/}
			{/*					`url('https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces${movieDetail.backdrop_path}')`*/}
			{/*				)}*/}
			{/*			>*/}
			{/*				<div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(10.5,31.5,52.5,1)_20%,rgba(10.5,31.5,52.5,0)_50%)]" />*/}
			{/*				<div className="absolute inset-0 bg-slate-700 opacity-50" />*/}
			{/*				<div className=""></div>*/}
			{/*				<div className="w-[calc(((100vw/2.222222) - 40px)/1.5)] min-w-[calc(((100vw/2.222222) - 40px)/1.5)] h-[calc((100vw/2.222222) - 40px)] min-h-[calc((100vw/2.222222) - 40px)] absolute left-5 top-5 z-[4] overflow-hidden">*/}
			{/*					<img*/}
			{/*						className="hidden h-full min-h-full w-full min-w-full max-md:block"*/}
			{/*						src={`https://media.themoviedb.org/t/p/w116_and_h174_face/${movieDetail.poster_path}`}*/}
			{/*						// srcSet={`https://media.themoviedb.org/t/p/w116_and_h174_face/${movieDetail.poster_path} 1x, https://media.themoviedb.org/t/p/w220_and_h330_face/${movieDetail.poster_path} 2x`}*/}
			{/*						alt="Venom: Let There Be Carnage"*/}
			{/*					/>*/}

			{/*					<img*/}
			{/*						className="hidden h-full min-h-full w-full min-w-full md:block"*/}
			{/*						src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path}`}*/}
			{/*						// srcSet={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path} 1x, https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movieDetail.poster_path} 2x`}*/}
			{/*						alt={*/}
			{/*							isMovie*/}
			{/*								? `${movieDetail.title} poster`*/}
			{/*								: `${movieDetail.name} poster`*/}
			{/*						}*/}
			{/*					/>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className="mt-2 text-center text-2xl font-semibold">*/}
			{/*			{isMovie ? movieDetail.title : movieDetail.name}*/}
			{/*			<span className="pl-1 text-xl text-gray-500">*/}
			{/*				(*/}
			{/*				<>*/}
			{/*					{isMovie*/}
			{/*						? movieDetail.release_date.split('-')[0]*/}
			{/*						: movieDetail.first_air_date.split('-')[0]}*/}
			{/*				</>*/}
			{/*				)*/}
			{/*			</span>*/}
			{/*		</div>*/}

			{/*		<div className="flex items-center justify-center gap-4 py-3">*/}
			{/*			<div className="flex items-center gap-2">*/}
			{/*				<div className="h-12 w-12">*/}
			{/*					<RoundedProgressBar*/}
			{/*						progress={Math.trunc(movieDetail.vote_average * 10)}*/}
			{/*					/>*/}
			{/*				</div>*/}
			{/*				<span className="font-semibold">User Score</span>*/}
			{/*			</div>*/}

			{/*			<hr className="h-5 border-l border-gray-300" />*/}
			{/*			<div className="font-semibold">What is your Vibe?</div>*/}
			{/*		</div>*/}

			{/*		<div className="flex w-full items-center justify-center gap-2 border-b border-t bg-gray-500 py-2">*/}
			{/*			<div className="border border-[#FFFFFF99] p-0.5 text-sm text-[#FFFFFF99]">*/}
			{/*				PG-13*/}
			{/*			</div>*/}
			{/*			<div className="text-center text-sm text-white">*/}
			{/*				{isMovie && (*/}
			{/*					<>*/}
			{/*						{movieDetail.release_date} ({movieDetail.origin_country})*/}
			{/*						• {runtime} •*/}
			{/*					</>*/}
			{/*				)}*/}
			{/*				Play Trailer*/}
			{/*				<br />*/}
			{/*				{movieDetail.genres.map(r => r.name).join(', ')}*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className="px-5 pt-3">*/}
			{/*			<div className="font-medium italic text-gray-500">*/}
			{/*				{movieDetail.tagline}*/}
			{/*			</div>*/}
			{/*			<div className="text-xl font-semibold">Overview</div>*/}
			{/*			<div className="mt-2 text-sm font-normal">*/}
			{/*				{movieDetail.overview}*/}
			{/*			</div>*/}

			{/*			<hr className="my- flex h-0.5 w-full" />*/}
			{/*			<div className="grid w-full grid-cols-2 gap-3 pb-3">*/}
			{/*				{importantCrews.map((d, i) => (*/}
			{/*					<div key={d.name} className="w-fit">*/}
			{/*						<div className="font-medium">{d.name}</div>*/}
			{/*						<div className="text-xs">{d.jobs.join(', ')}</div>*/}
			{/*					</div>*/}
			{/*				))}*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}

			<CastCrew paginatedCast={paginatedCast}/>
			<div className="w-full space-y-3 pb-5 pt-10">
				<span className="text-l pl-5 font-semibold">Top Billed Cast</span>
				<div className="flex w-full gap-x-4 overflow-auto pb-3 pl-5">
					{paginatedCast.map((d, i) => (
						<div
							key={d.id}
							className="flex h-60 w-[125px] flex-col rounded-lg shadow-md"
						>
							<div className="h-[7.3rem] w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
								<FallbackImage
									alt="cast"
									src={
										d.profile_path
											? `https://media.themoviedb.org/t/p/w120_and_h133_face${d.profile_path}`
											: `${VERCEL_BASE_URL}/images/defaultProfile.svg`
									}
								/>
							</div>

							<p className="w-full px-2 pt-1">
								<div className="font-medium">{d.original_name}</div>
								<div className="text-sm">
									{d.character}
									{/*Eddie Brock/ <br /> Venom*/}
								</div>
							</p>
						</div>
					))}
					<div className="flex items-center justify-center gap-1 whitespace-nowrap px-10 font-semibold">
						View More
						<FaArrowRightLong />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MediaDetail;
