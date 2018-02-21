import React, { Component } from "react";

export default class Rockets extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    document.title = "SpaceX Visual 🚀 Rockets"
  }

  render() {
    return (
      <div>
        <h2>Rockets</h2>
        <RocketList />
        <hr />
        <h2>Detailed Rocket Info</h2>
        <RocketDetail />
      </div>
    );
  }
}

class RocketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launch: [],
      reversed: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.UpcomingLaunches();
  }

  // Get the JSON
  UpcomingLaunches() {
      fetch("https://api.spacexdata.com/v2/rockets")
      .then(response => response.json())
      .then(json =>{
         this.setState({ launch: json.reverse() })
      });
  }

  handleClick() {
    // Because we reverse the launch array on render, pass the current launch array
    const reverseLaunches = this.state.launch
    this.setState( { launch: reverseLaunches, reversed: !this.state.reversed } );
    console.log(this.state)
  }

  render() {
    const launches = this.state.launch.reverse().map((item, i) => (
      <div className='launch card'>
        <div className='card-header'>
          <p><strong>{ item.name }</strong></p>
        </div>
        <div className='card-block'>
          <p><strong>Stages: </strong> {item.stages}</p>
          {item.bootsters > 0 ? <p><strong>Boosters: </strong> {item.boosters}</p> : null}
          <p><strong>Boosters: </strong> {item.boosters}</p>
          <p><strong>Cost per Launch: </strong> {item.cost_per_launch}</p>
          <p><strong>Success Rate: </strong> {item.success_rate_pct}%</p>
          <p><strong>First Flight: </strong> {item.first_flight}</p>
        </div>
      </div>
    ));

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <button className='btn btn-info' onClick={this.handleClick}>Show {this.state.reversed ? 'lastest' : 'earliest'} first</button>
        <div className="panel-list row list">{ launches }</div>
      </div>
    );
  }
}

class RocketDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launch: [],
      reversed: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.UpcomingLaunches();
  }

  // Get the JSON
  UpcomingLaunches() {
      fetch("https://api.spacexdata.com/v2/parts/cores")
      .then(response => response.json())
      .then(json =>{
         this.setState({ launch: json.reverse() })
      });
  }

  handleClick() {
    // Because we reverse the launch array on render, pass the current launch array
    const reverseLaunches = this.state.launch
    this.setState( { launch: reverseLaunches, reversed: !this.state.reversed } );
    console.log(this.state)
  }

  render() {
    const launches = this.state.launch.reverse().map((item, i) => (
      <div className='launch card'>
        <div className='card-header'>
          <p><strong>{ item.core_serial }</strong></p>
        </div>
        <div className='card-block'>
          <p><strong>Status: </strong> {item.status}</p>
          <p><strong>Original Launch: </strong> {item.original_launch}</p>
          <p><strong>Missions: </strong></p>
          {
              item.missions.map((missions, index) => {
                  return missions !== null ?
                    <div>
                      <p>{missions}</p>
                    </div>
                  : false
              })
          }
          <p><strong>Details: </strong> {item.details}</p>
        </div>
      </div>
    ));

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <button className='btn btn-info' onClick={this.handleClick}>Show {this.state.reversed ? 'lastest' : 'earliest'} first</button>
        <div className="panel-list row list">{ launches }</div>
      </div>
    );
  }
}
