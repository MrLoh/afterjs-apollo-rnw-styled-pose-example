import React, { Component } from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components/native";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { View, Text } from "react-native";

// const Wrapper = styled(View)`
//   flex: 1;
//   background-color: ${p => p.theme.colors.altBackground};
// `;

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: "stuff" };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgray",
          alignItems: "center",
          overflow: "scroll"
        }}
      >
        <Text style={{ fontSize: 30 }}>Welcome to After.js</Text>
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
                <Text style={{ fontWeight: "700" }}>Our Cinemas</Text>
                <View>
                  {data.cinemas.map(({ name, id }) => (
                    <Text key={id} style={{ marginTop: 20 }}>
                      {name}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <Text>loading ...</Text>
            )
          }
        </Query>
      </View>
    );
  }
}

export default Home;
