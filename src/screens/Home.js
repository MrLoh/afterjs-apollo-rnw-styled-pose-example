import React from 'react';
import styled from 'styled-components/native';
import css from 'styled-css/native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, Text } from 'react-native';
import posed from 'react-pose';

const Wrapper = styled.ScrollView.attrs({
	contentContainerStyle: css`
		padding-top: ${(p) => p.theme.unit * 4}px;
	`,
})`
	flex: 1;
	width: 400px;
`;

const Title = styled.Text`
	font-size: 30px;
`;

const SubTitle = styled.Text`
	font-weight: 700;
`;

const ItemWrapper = posed.div({
	enter: { staggerChildren: 50 },
	exit: { staggerChildren: 20, staggerDirection: -1 },
});

const ItemTransition = posed.div({
	enter: { x: 0, opacity: 1 },
	exit: { x: 50, opacity: 0 },
});
const Item = styled(ItemTransition)`
	margin-top: 20px;
`;

const Home = () => (
	<Wrapper>
		<Title>Welcome to After.js</Title>
		<Query
			query={gql`
				query AllFilms {
					allFilms {
						id
						title
					}
				}
			`}
		>
			{({ data, error }) =>
				error ? (
					<Text>{JSON.stringify(error)}</Text>
				) : data.allFilms ? (
					<View>
						<SubTitle>All Films</SubTitle>
						<ItemWrapper>
							{data.allFilms.map(({ title, id }) => (
								<Item key={id}>
									<Text>{title}</Text>
								</Item>
							))}
						</ItemWrapper>
					</View>
				) : (
					<Text>loading ...</Text>
				)
			}
		</Query>
	</Wrapper>
);

export default Home;
