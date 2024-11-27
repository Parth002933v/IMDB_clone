const RoundedProgressBar = ({ progress }: { progress: number }) => {
	const progressColor = progress > 70 ? '#21cf79' : '#d2d531';
	const innerProgressColor = progress > 70 ? '#189c5b' : '#8f9222';

	return (
		<div className="h-full w-full text-center">
			{/* Progress Bar */}
			<div
				className="relative mx-auto  h-full w-full rounded-full border-2 border-black"
				style={{
					background: `conic-gradient(
						${progressColor} ${progress}%,
						${innerProgressColor} ${progress}%
					)`,
				}}
			>
				{/*inset-[0.150rem]*/}
				<div className="absolute inset-[0.150rem] flex items-center justify-center rounded-full bg-black p-0 text-center">
					<div className="flex text-center text-white">
						<div className="text-sm font-bold">{progress}</div>
						<span className="align-super text-[0.3rem]">%</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoundedProgressBar;
