import React, { Component } from "react";
import {
  NavLink,
  HashRouter,
  Routes,
  Route
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
import NextLaunch from "./NextLaunch"

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <header id="header" role="banner">
            <div className="header-inner container">
              <div id="navigation">
                <nav className="main-nav">
                  <NavLink to="/"><h1>SpaceX Visual</h1></NavLink>
                  <div className="region region-navigation">
                    <ul className="menu nav-list nav-primary">
                      <li><NavLink to="/previous" className="menu__link">Previous Launches</NavLink></li>
                      <li><NavLink to="/upcoming" className="menu__link">Upcoming Launches</NavLink></li>
                    </ul>
                    <ul className="menu nav-list nav-secondary">
                      <li><NavLink to="/company">Company</NavLink></li>
                      <li><NavLink to="/rockets">Rockets</NavLink></li>
                      <li><NavLink to="/capsules">Capsules</NavLink></li>
                      <li><NavLink to="/launchpads">Launchpads</NavLink></li>
                      <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                  </div>
                  <a id="menuTab"><i className="fas fa-bars fa-2x"></i></a>
                </nav>
              </div>
            </div>
          </header>
          <div className="container content">
            <div className="row">
              <div className="col-sm-12">
                <div className="content">
                  <br/><br/><br/><br/>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/previous" element={<Previous />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/rockets" element={<Rockets />} />
                    <Route path="/capsules" element={<Capsules />} />
                    <Route path="/launchpads" element={<Launchpads />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
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
