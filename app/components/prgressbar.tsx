const RoundedProgressBar = ({ progress }: { progress: number }) => {

	const progressColor = progress > 70 ? '#21cf79' : '#d2d531';
	const innerProgressColor = progress > 70 ? '#189c5b' : '#8f9222';


	return (
		<div className="h-full w-full text-center">
			{/* Progress Bar */}
			<div
				className="relative mx-auto mt-8 h-full w-full rounded-full border-2 border-black"
				style={{
					background: `conic-gradient(
						${progressColor} ${progress}%,
						${innerProgressColor} ${progress}%
					)`,
				}}
			>
				<div className="absolute inset-[0.200rem] flex items-center justify-center rounded-full bg-black">
					<div className="flex items-center text-white text-center ">
						<span className="text-xs  font-semibold">{progress}</span>
						<span className="align-super text-xs">%</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoundedProgressBar;
