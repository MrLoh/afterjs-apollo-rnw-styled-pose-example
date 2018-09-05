import React from 'react';
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
	left: 0;
`;

const ScreenWrapper = ({ children }) => (
	<Wrapper>
		<SideBarWrapper>
			<Link to="/">Home -></Link>
			<Link to="/about">About -></Link>
		</SideBarWrapper>
		{children}
	</Wrapper>
);

export default ScreenWrapper;
