import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';
import { useLoader } from '~/hooks/useLoader';

const useCustomFetcher = <T>(intData: T) => {
	const topLoader = useLoader();

	const [data, setData] = useState<T>(intData);

	let fetcher = useFetcher();

	useEffect(() => {
		if (fetcher.data) {
			setData(fetcher.data as T);
		}
	}, [fetcher]);

	useEffect(() => {
		if (fetcher.state === 'loading') {
			topLoader.loaderRef.current?.continuousStart();
		} else if (fetcher.state === 'idle') {
			topLoader.loaderRef.current?.complete();
		} else {
			topLoader.loaderRef.current?.complete();
		}
	}, [fetcher.state]);

	return { data, fetcher };
};

export default useCustomFetcher;
