import React from 'react';
import styled from 'styled-components/native';
import css from 'styled-css/native';
import posed from 'react-pose';
import { Text } from 'react-native';

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

const About = () => (
	<Wrapper>
		<Title>About</Title>
		<ItemWrapper>
			<Item>
				<Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
			</Item>
			<Item>
				<Text>
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
					unknown printer took a galley of type and scrambled it to make a type specimen book.
				</Text>
			</Item>
			<Item>
				<Text>
					It has survived not only five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged.
				</Text>
			</Item>
			<Item>
				<Text>
					It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
					passages, and more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum.
				</Text>
			</Item>
		</ItemWrapper>
	</Wrapper>
);

export default About;
