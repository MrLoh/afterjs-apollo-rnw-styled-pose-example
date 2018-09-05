import React from 'react';
import posed, { PoseGroup } from 'react-pose';

const Transition = posed.div({
	enter: { opacity: 1, delay: 300, beforeChildren: true },
	exit: { opacity: 0 },
});

const RouteTransitioner = ({ children, location }) => (
	<PoseGroup>
		<Transition key={location.key}>{children}</Transition>
	</PoseGroup>
);

export default RouteTransitioner;
