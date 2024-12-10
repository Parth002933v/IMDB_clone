import React from 'react';
import { Route } from '../../../.react-router/types/app/routes/profile/+types/Recommendations';
import { Outlet } from 'react-router';


export function loader({params}:Route.LoaderArgs){

}

const Recommendation = () => {
	return (
		<div>

			recommendations
			<Outlet/>
		</div>
	);
};

export default Recommendation;
