import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Link } from 'react-router-dom';
import styled from 'styled-components/native';

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: ${(p) => p.theme.colors.altBackground};
`;

const SideBarWrapper = styled.View`
	position: absolute;
	background-color: ${(p) => p.theme.colors.secondary};
	left: 0;
	height: 100%;
	padding: 20px;
`;

const Transition = posed.div({
	enter: { opacity: 1, delay: 300, beforeChildren: true },
	exit: { opacity: 0 },
});

const Layout = ({ children, location }) => (
	<Wrapper>
		<SideBarWrapper>
			<Link to="/">Home -></Link>
			<Link to="/about">About -></Link>
		</SideBarWrapper>
		<PoseGroup>
			<Transition key={location.key}>{children}</Transition>
		</PoseGroup>
	</Wrapper>
);

export default Layout;
