import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
              <div>{error}</div>
            ) : data.cinemas ? (
              <div>
                <h3>Our Cinemas</h3>
                <ul>
                  {data.cinemas.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>loading ...</div>
            )
          }
        </Query>
      </Wrapper>
    );
  }
}

export default Home;
