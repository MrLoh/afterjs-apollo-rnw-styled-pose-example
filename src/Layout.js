import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { NavLink, Route } from 'react-router-dom';
import styled from 'styled-components/native';

const Wrapper = styled.View`
	flex: 1;
	background-color: ${(p) => p.theme.colors.altBackground};
	flex-direction: row;
`;

const SideBarWrapper = styled.View`
	background-color: ${(p) => p.theme.colors.secondary};
	height: 100%;
	width: 150px;
	padding: 20px;
`;

const ContentWrapper = styled.View`
	height: 100%;
	flex: 1;
	align-items: center;
`;

const Tiny = styled.Text`
	margin-top: 20px;
	font-size: 10px;
	color: ${(p) => p.theme.colors.background};
`;

const Transition = posed.div({
	enter: { opacity: 1, delay: 300, beforeChildren: true },
	exit: { opacity: 0 },
});

const Layout = ({ children, location }) => (
	<Wrapper>
		<SideBarWrapper>
			<NavLink exact to="/" activeStyle={{ fontWeight: 800 }}>
				Home ->
			</NavLink>
			<NavLink to="/about" activeStyle={{ fontWeight: 800 }}>
				About ->
			</NavLink>
			<Route path="/about" render={() => <Tiny>on about page</Tiny>} />
		</SideBarWrapper>
		<ContentWrapper>
			<PoseGroup>
				<Transition key={location.key}>{children}</Transition>
			</PoseGroup>
		</ContentWrapper>
	</Wrapper>
);

export default Layout;
