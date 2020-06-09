import React from "react";
import "./Header.scss";
import ingot from "../../assets/ingot.jpg";
import Axios from "axios";
import {withRouter} from 'react-router-dom'

const Header = (props) => {
  return (
    <div className="header-container">
      <img id="ingot" src={ingot} alt="" />
      <p>GOLDEN</p>
      <i onClick={() => { Axios.post('/auth/logout');  props.history.push('/login')}} className="fas fa-bars"></i>
    </div>
  );
};

export default withRouter(Header);
