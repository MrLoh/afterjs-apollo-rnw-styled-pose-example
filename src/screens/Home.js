import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: "stuff" };
  }

  render() {
    return (
      <div>
        <h2>Welcome to After.js</h2>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default Home;
