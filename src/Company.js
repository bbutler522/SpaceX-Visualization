import React, { Component } from "react";

export default class Company extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    document.title = "SpaceX Visual 🚀 Company"
  }

  render() {
    return (
      <div>
        <h2>Company</h2>
        <CompanyInfo />
      </div>
    );
  }
}

class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: []
    };
  }

  componentDidMount() {
    this.CompanyInfo();
  }

  // Get the JSON
  CompanyInfo() {
      fetch("https://api.spacexdata.com/v2/info")
      .then(response => response.json())
      .then(json =>{
         this.setState({ company: json })
      });
  }

  render() {
    const company = (
      <div>
        <p><strong>Company: </strong> {this.state.company.name}</p>
        <p><strong>Founder: </strong> {this.state.company.founder}</p>
        <p><strong>Founded: </strong> {this.state.company.founded}</p>
        <p><strong>Employees: </strong> {this.state.company.employees}</p>
        <p><strong>CEO: </strong> {this.state.company.ceo}</p>
        <p><strong>CTO: </strong> {this.state.company.cto}</p>
        <p><strong>COO: </strong> {this.state.company.coo}</p>
        <p><strong>CTO Propulsion: </strong> {this.state.company.cto_propulsion}</p>
        <p><strong>Valuation: </strong> {this.state.company.valuation}</p>
        <p><strong>Summary: </strong> {this.state.company.summary}</p>
      </div>

    );

    return (
      <div id="layout-content" className="layout-content-wrapper row">
        <div className="panel-list col-12 list">{ company }</div>
      </div>
    );
  }
}
