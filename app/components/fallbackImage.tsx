import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { VERCEL_BASE_URL } from '~/lib/constant';

const FallbackImage = ({
	alt,
	src,
	defaultImage,
	className,
}: {
	alt: string;
	src: string;
	defaultImage?: string;
	className?: string;
}) => {
	const [imgSrc, setImgSrc] = useState(src);

	const handleImageError = () => {
		setImgSrc(defaultImage || '');
	};
	return (
		<img
			onError={handleImageError}
			defaultValue={`${VERCEL_BASE_URL}/images/defaultProfile.svg`}
			alt={alt}
			src={imgSrc}
			className={twMerge(`h-full w-full rounded-lg object-fill object-top`,className)}
		/>
	);
};

export default FallbackImage;
