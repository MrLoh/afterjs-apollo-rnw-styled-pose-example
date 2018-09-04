import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/native';
import css from 'styled-css/native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, Text } from 'react-native';

const Wrapper = styled.ScrollView.attrs({
	contentContainerStyle: css`
		align-items: center;
		justify-content: center;
		padding-top: ${(p) => p.theme.unit * 4}px;
	`,
})`
	flex: 1;
	background-color: ${(p) => p.theme.colors.altBackground};
`;

const Title = styled.Text`
	font-size: 30px;
`;

const SubTitle = styled.Text`
	font-weight: 700;
`;

const Item = styled.Text`
	margin-top: 20px;
`;

class Home extends Component {
	static async getInitialProps({ req, res, match, history, location, ...ctx }) {
		return { whatever: 'stuff' };
	}

	render() {
		return (
			<Wrapper>
				<Title>Welcome to After.js</Title>
				<Link to="/about">About -></Link>
				<Query
					query={gql`
						query CinemaNames {
							cinemas {
								id
								name
							}
						}
					`}
				>
					{({ data, error }) =>
						error ? (
							<Text>{JSON.stringify(error)}</Text>
						) : data.cinemas ? (
							<View>
								<SubTitle>Our Cinemas</SubTitle>
								<View>{data.cinemas.map(({ name, id }) => <Item key={id}>{name}</Item>)}</View>
							</View>
						) : (
							<Text>loading ...</Text>
						)
					}
				</Query>
			</Wrapper>
		);
	}
}

export default Home;
