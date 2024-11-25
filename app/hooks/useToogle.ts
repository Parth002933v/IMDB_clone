import React, { useState } from 'react';
import { Simulate } from 'react-dom/test-utils';

const useToggle = (initVal: boolean) => {
	const [isOpen, setIsOpen] = useState(initVal);

	const toggleIsOpen = () => {
		setIsOpen(prevState => !prevState);
	};
	return { isOpen, toggleIsOpen };
};

export default useToggle;
