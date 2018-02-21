import React, { Component } from "react";
import Moment from 'moment';
import {toTitleCase} from './helpers';

export class NextLaunch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      launch: []
    };
  }

  componentDidMount() {
    this.UpcomingLaunches();
  }

  // Get the JSON
  UpcomingLaunches() {
      fetch("https://api.spacexdata.com/v2/launches/upcoming")
      .then(response => response.json())
      .then(json =>{
         this.setState({ launch: json.reverse() })
      });
  }

  render() {
    Moment.locale('en');
    const launches = this.state.launch.reverse().map((item, i) => (
      <div className='launch card'>
        <div className='card-header'>
          <p><strong>Flight #:</strong> { item.flight_number }</p>
          {item.links.mission_patch !== null ? <img className='launch-patch img-fluid' src={item.links.mission_patch} /> : false}
        </div>
        <div className='card-block'>
          <p className='date'><strong>Launch Date:</strong> {Moment(item.launch_date_unix*1000).format('MM/DD/YYYY')}</p>
          <p><strong>Rocket Name:</strong> {item.rocket.rocket_name}</p>
          <p><strong>Rocket Type:</strong> {item.rocket.rocket_type}</p>
          {item.launch_success !== null ?
            (item.launch_success === true ?
              <p className='launch-success'><strong>Launch Successful</strong></p> :
              <p className='launch-failure'><strong>Launch Failure</strong></p>
            ) : false
          }
          {item.rocket.first_stage.cores[0].land_success === true ? <p className="text-info"><strong>Landing Successful</strong></p> : false}

          {/* Add in Reusable parts section here */}
          {
              $.map(item.reuse, function(type,index) {
                  return type === true ? <p className="text-info"><strong>Reusing {toTitleCase(index)}</strong></p> : false;
              })
          }

          {item.telemetry.flight_club !== null ? <p><a href={item.telemetry.flight_club} target="_blank">Telemetry</a></p> : false}
          <div className="accordion" id={"accordionNext"} role="tablist" aria-multiselectable="true">
            {item.details !== null ?
              <div className="card border-left-0 border-right-0  border-left-0 border-bottom-0">
                <div className="card-header" role="tab" id={"headingOneNext"}>
                  <h5 className="mb-0">
                    <a data-toggle="collapse" data-parent={"#accordionNext"} href={"#collapseOneNext"} aria-expanded="true" aria-controls={"collapseOneNext"}>Details</a>
                  </h5>
                </div>
                <div id={"collapseOneNext"} className="collapse" role="tabpanel" aria-labelledby={"headingOneNext"}>
                  <div className="card-block">
                    {item.details}
                  </div>
                </div>
              </div>
            : false}
            <div className="card border-left-0 border-right-0 border-bottom-0">
              <div className="card-header" role="tab" id={"headingThreeNext"}>
                <h5 className="mb-0">
                  <a className="collapsed" data-toggle="collapse" data-parent={"#accordionNext"} href={"#collapseThreeNext"} aria-expanded="false" aria-controls={"collapseThree" + item.flight_number}>Payload</a>
                </h5>
              </div>
              <div id={"collapseThreeNext"} className="collapse" role="tabpanel" aria-labelledby={"headingThreeNext"}>
                <div className="card-block">
                    {
                        item.rocket.second_stage.payloads.map((payloads, index) => {
                            return payloads.payload_id !== null ?
                              <div>
                                <p><strong>ID:</strong> {payloads.payload_id}</p>
                                <p><strong>Type:</strong> {payloads.payload_type}</p>
                                <p><strong>Customers:</strong></p>
                                {
                                    payloads.customers.map((customers, index) => {
                                        return customers !== null ?
                                          <div>
                                            {customers}
                                            <br/>
                                          </div>
                                        : false
                                    })
                                }
                                <hr/>
                              </div>
                            : false
                        })
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div id="layout-content" className="layout-content-wrapper">
        <h2>Next Launch <span id="launchCountdown"></span></h2>
        <div className="panel-list row list">{ launches[0] }</div>
        <p class="col-12">Countdown is based on the initial launch time, which is subject to change.</p><p class="col-12">Stream of launch usually available at <a href="http://www.spacex.com/webcast" target="_blank">http://www.spacex.com/webcast</a></p>
      </div>
    );
  }
}
