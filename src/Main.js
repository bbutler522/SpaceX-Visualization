import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Charts from "./Charts";
import Previous from "./Previous";
import Upcoming from "./Upcoming";
import Company from "./Company";
import Rockets from "./Rockets";
import Capsules from "./Capsules";
import Launchpads from "./Launchpads";
import About from "./About";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <header id="header" role="banner">
            <div class="header-inner container">
              <div id="navigation">
                <nav class="main-nav">
                  <NavLink to="/"><h1>SpaceX Visual</h1></NavLink>
                  <div class="region region-navigation">
                    <ul className="menu nav-list nav-primary">
                      <li><NavLink to="/previous" className="menu__link">Previous Launches</NavLink></li>
                      <li><NavLink to="/upcoming" className="menu__link">Upcoming Launches</NavLink></li>
                    </ul>
                    <ul class="menu nav-list nav-secondary">
                      <li><NavLink to="/company">Company</NavLink></li>
                      <li><NavLink to="/rockets">Rockets</NavLink></li>
                      <li><NavLink to="/capsules">Capsules</NavLink></li>
                      <li><NavLink to="/launchpads">Launchpads</NavLink></li>
                      <li><NavLink to="/about">About</NavLink></li>
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
                  <br/><br/><br/><br/>
                  <Route exact path="/" component={Home}/>
                  <Route path="/previous" component={Previous}/>
                  <Route path="/upcoming" component={Upcoming}/>
                  <Route path="/company" component={Company}/>
                  <Route path="/rockets" component={Rockets}/>
                  <Route path="/capsules" component={Capsules}/>
                  <Route path="/launchpads" component={Launchpads}/>
                  <Route path="/about" component={About}/>
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
