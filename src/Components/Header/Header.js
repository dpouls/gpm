import React, { useState, useEffect } from "react";

import "./Header.scss";
import Axios from "axios";
import { withRouter } from "react-router-dom";


const Header = (props) => {
  const [menuClicked, toggleMenuClicked] = useState(false);
  const [navigationLinks, setNavigationLinks] = useState([
    "Home",
    "Portal",
    "Log out"
  ]);
  const [userInfo, setUserInfo] = useState({})
   useEffect( () => {
     Axios.get('/api/user').then(res => {
      setUserInfo(res.data)
    })

    console.log('infinite loop')
  },[])
    useEffect(() => {
      if(!userInfo.user_id){
        setNavigationLinks(["Home",
          "Log in"])
      }
        else {
          if(userInfo.isadmin){
            setNavigationLinks(["Home",
            "Portal",
            "Admin",
            "Log out"])
            
        }
      }
      
    }, [userInfo,menuClicked])

  return (
    <div className='header-nav-links-container'>
    <div className="header-container">
      <i
        onClick={() => toggleMenuClicked(!menuClicked)}
        className="fas fa-bars"
      ></i>
      
    </div>
    {menuClicked ? (
        <section className='nav-links-container'>
          {navigationLinks.map((navLink, i) => {
            return <section key={i} onClick={() => {
              if(navLink === 'Home'){props.history.push('/')}
              else if(navLink === 'Log out'){
                  Axios.post('/auth/logout').then(() => {
                    setUserInfo({})
                    props.history.push('/')})
                }
              else if(navLink === 'Log in') {
                props.history.push('/login')
              } else {
                props.history.push(navLink)
              }
              toggleMenuClicked(!menuClicked)
            }}>{navLink}</section>;
          })}
        </section>
      ) : null}
    </div>
  );
};

export default withRouter(Header);
