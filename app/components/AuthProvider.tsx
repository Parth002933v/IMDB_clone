import { createContext, useContext } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error('useAuth must be used within the AuthProvider');
	}
	return authContext;
};

const AuthProvider = ({ children }:{children:React.ReactNode}) => {
	new TextEncoder().encode()
	return <>{children}</>;
};
