import React, { Component } from "react";

export default class Launchpads extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    document.title = "SpaceX Visual 🚀 Launchpads"
  }

  render() {
    return (
      <div>
        <h2>Launchpads</h2>
        <LaunchpadList />
      </div>
    );
  }
}

class LaunchpadList extends Component {
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
      fetch("https://api.spacexdata.com/v2/launchpads")
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
          <p><strong>{ item.full_name }</strong></p>
        </div>
        <div className='card-block'>
          <p>{item.location.name}</p>
          <p>{item.location.region}</p>
          <p>{item.location.latitude}, {item.location.longitude}</p>
          <p><a href={'https://www.google.com/maps/@' + item.location.latitude + ',' + item.location.longitude + ',15z'}>Google Maps</a></p>
          <p><strong>Vehicles Launched:</strong></p>
          {
              item.vehicles_launched.map((vehicles, index) => {
                  return vehicles !== null ?
                    <div>
                      <p>{vehicles}</p>
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
        <button className='btn btn-info' onClick={this.handleClick}>Reverse</button>
        <div className="panel-list row list">{ launches }</div>
      </div>
    );
  }
}
