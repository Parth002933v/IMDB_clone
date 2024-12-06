import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { generateNumbers } from '~/lib/utils';
import { Link, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

const PaginatedNumberButton = ({
	n,
	isSelected = false,
}: {
	n: number;
	isSelected?: boolean;
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	searchParams.set('page', `${n}`);
	const CurrentPageParam = new URLSearchParams(searchParams);

	return (
		<>
			{isSelected ? (
				<div className={twMerge(`rounded-lg px-2`, isSelected && 'bg-gray-200')}>
					{n}
				</div>
			) : (
				<Link
					to={`./?${CurrentPageParam.toString()}`}
					className={twMerge(`rounded-lg px-2`, isSelected && 'bg-gray-200')}
				>
					{n}
				</Link>
			)}
		</>
	);
};

interface PaginatedComponentProps {
	currentPage?: number;
	totalPages: number;
}

const PaginatedComponent = ({
	currentPage = 1,
	totalPages,
}: PaginatedComponentProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	searchParams.set('page', `${currentPage - 1}`);
	const PrevPageSearchParam = new URLSearchParams(searchParams);

	searchParams.set('page', `${currentPage + 1}`);
	const NextPageSearchParam = new URLSearchParams(searchParams);

	return (
		<>
			{currentPage <= 1 ? (
				<div className={'flex items-center text-gray-500'}>
					<GoArrowLeft />
					Previous
				</div>
			) : (
				<Link
					to={`./?${PrevPageSearchParam.toString()}`}
					onClick={() => {
						if (currentPage > 1) onClick(currentPage - 1);
					}}
					className={'flex items-center'}
				>
					<GoArrowLeft />
					Previous
				</Link>
			)}

			<div className="flex">
				{((currentPage: number) => {
					//1 .. 12 13 14 ... 500
					if (
						totalPages > 5 &&
						currentPage > 4 &&
						!(currentPage > totalPages - 4 && currentPage <= totalPages)
					) {
						return (
							<>
								<PaginatedNumberButton isSelected={1 == currentPage} n={1} />
								<div className="px-1.5">…</div>
								<PaginatedNumberButton n={currentPage - 1} />
								<PaginatedNumberButton isSelected={true} n={currentPage} />
								<PaginatedNumberButton n={currentPage + 1} />
								<div className="px-1.5">…</div>
								<PaginatedNumberButton n={totalPages} />
							</>
						);
					}
					// 1 2 3 4 5
					else if (totalPages <= 5) {
						return (
							<>
								{generateNumbers(totalPages).map(i => (
									<PaginatedNumberButton
										isSelected={currentPage == i}
										key={i}
										n={i}
									/>
								))}
							</>
						);
					}
					// 1 2 3 4 5 ... 500
					else if (totalPages > 5 && currentPage <= 4) {
						return (
							<>
								{generateNumbers(5).map(i => (
									<PaginatedNumberButton
										isSelected={currentPage == i}
										key={i}
										n={i}
									/>
								))}
								<div className="px-1.5">…</div>
								<PaginatedNumberButton n={totalPages} />
							</>
						);
					}
					// 1 ... 496 497 498 499 500
					else if (
						totalPages > 5 &&
						currentPage >= totalPages - 3 &&
						currentPage <= totalPages
					) {
						return (
							<>
								<PaginatedNumberButton n={1} />
								<div className="px-1.5">…</div>
								{generateNumbers(5).map((e, i) => (
									<PaginatedNumberButton
										key={i}
										isSelected={currentPage == totalPages - 5 + i + 1}
										n={totalPages - 5 + i + 1}
									/>
								))}
							</>
						);
					}
				})(currentPage)}
			</div>

			{currentPage < totalPages ? (
				<Link
					to={`./?${NextPageSearchParam.toString()}`}
					className={'flex cursor-pointer items-center'}
					onClick={() => {
						if (currentPage < totalPages) {
							onClick(currentPage + 1);
						}
					}}
				>
					Next
					<GoArrowRight />
				</Link>
			) : (
				<div
					className={'flex items-center text-gray-500'}
					onClick={() => {
						if (currentPage < totalPages) {
							onClick(currentPage + 1);
						}
					}}
				>
					Next
					<GoArrowRight />
				</div>
			)}
		</>
	);
};

export default PaginatedComponent;
