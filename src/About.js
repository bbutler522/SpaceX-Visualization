import React, { Component } from "react";

export default class About extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    document.title = "SpaceX Visual 🚀 About"
  }

  render() {
    return (
      <div>
        <h2>About</h2>
        <p>A visualization of SpaceX launches.</p>
        <p>Created using React, jQuery, Bootstrap, GitHub, SCSS, Babel, Webpack, and more.</p>
        <p>API's used:<br/><a href="https://api.spacexdata.com/v2/launches" target="_blank">https://api.spacexdata.com/v2/launches</a><br/> By: <a href="https://github.com/r-spacex/SpaceX-API" target="_blank">https://github.com/r-spacex/SpaceX-API</a></p>
        <p class="alert alert-info">Work in progress, some content is still being built and a lot of improvements to follow. Track updates on <a href="https://github.com/bbutler522/SpaceX-Visualization">GitHub</a>.</p>
        <p>GitHub:<br/><a href="https://github.com/bbutler522/SpaceX-Visualization" target="_blank">https://github.com/bbutler522/SpaceX-Visualization</a></p>
      </div>
    );
  }
}
