import React, { useState, useEffect } from "react";

import "./Header.scss";
import ingot from "../../assets/ingot.jpg";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  const [menuClicked, toggleMenuClicked] = useState(false);
  const [navigationLinks, setNavigationLinks] = useState([
    "Home",
    "Portal",
    "Admin",
  ]);
  return (
    <div className="header-container">
      <i
        onClick={() => toggleMenuClicked(!menuClicked)}
        className="fas fa-bars"
      ></i>
      {menuClicked ? (
        <section className='nav-links-container'>
          {navigationLinks.map((navLink) => {
            return <section>{navLink}</section>;
          })}
        </section>
      ) : null}
    </div>
  );
};

export default withRouter(Header);
