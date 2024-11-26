import { createContext, RefObject, useContext } from 'react';
import { LoadingBarRef } from 'react-top-loading-bar';

type LoaderContextType = {
	loaderRef: RefObject<LoadingBarRef>;
};
export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
	const context = useContext(LoaderContext);

	if (!context) {
		throw new Error('The useLoader must be used within the LoaderProvider');
	}

	return context;
};
