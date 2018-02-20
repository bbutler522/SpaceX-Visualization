import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Charts from "./Charts";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <header id="header" role="banner">
            <div class="header-inner container">
              <div id="navigation">
                <nav class="main-nav">
                  <a href="#"><h1>SpaceX Visual</h1></a>
                  <div class="region region-navigation">
                    <ul className="header">
                      <li><NavLink to="/">Home</NavLink></li>
                      <li><NavLink to="/charts">Charts</NavLink></li>
                    </ul>
                    <ul className="menu nav-list nav-primary">
                      <li class="first"><a href="#previousLaunches" class="menu__link">Previous Launches</a></li>
                      <li><a href="#upcoming">Upcoming Launches</a></li>
                    </ul>
                  </div>
                  <a id="menuTab"><i class="fas fa-bars fa-2x"></i></a>
                </nav>
              </div>
            </div>
          </header>
          <div class="container content">
            <div class="row">
              <div class="col-sm-12">
                <div className="content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/charts" component={Charts}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
