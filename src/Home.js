import React, { Component } from "react";
import {NextLaunch} from './NextLaunch'

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    document.title = "SpaceX Visual 🚀 A Look at Launch Data from SpaceX"
  }

  render() {
    return (
      <div id="nextLaunch">
        <NextLaunch />
      </div>
    );
  }
}

export default Home;
