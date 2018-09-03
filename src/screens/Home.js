import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  background-color: ${p => p.theme.colors.altBackground};
`;

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: "stuff" };
  }

  render() {
    return (
      <Wrapper>
        <h2>Welcome to After.js</h2>
        <Link to="/about">About -></Link>
      </Wrapper>
    );
  }
}

export default Home;
