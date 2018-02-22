import React, { Component } from "react";

export default class Capsules extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    document.title = "SpaceX Visual 🚀 Capsules"
  }

  render() {
    return (
      <div>
        <h2>Capsules</h2>
        <CapsuleList />
        <hr />
        <h2>Detailed Capsules</h2>
        <CapsuleDetail />
      </div>
    );
  }
}


class CapsuleList extends Component {
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
      fetch("https://api.spacexdata.com/v2/capsules")
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
          <p><strong>Crew Capacity: </strong> {item.crew_capacity}</p>
        </div>
      </div>
    ));

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <button className='btn btn-info' onClick={this.handleClick}>Show {this.state.reversed ? 'latest' : 'earliest'} first</button>
        <div className="panel-list row list">{ launches }</div>
      </div>
    );
  }
}

class CapsuleDetail extends Component {
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
      fetch("https://api.spacexdata.com/v2/parts/caps")
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
          <p><strong>{ item.capsule_serial }</strong> ({ item.type })</p>
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
        <button className='btn btn-info' onClick={this.handleClick}>Show {this.state.reversed ? 'latest' : 'earliest'} first</button>
        <div className="panel-list row list">{ launches }</div>
      </div>
    );
  }
}
