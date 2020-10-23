import React, { useState, useEffect } from "react";

import "./Header.scss";
import ingot from "../../assets/ingot.jpg";
import Axios from "axios";
import { withRouter } from "react-router-dom";


// I think the admin link is broken now...
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
      
      console.log('userinfo check', userInfo)
    }, [userInfo])

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
          {navigationLinks.map((navLink) => {
            return <section onClick={() => {
              if(navLink === 'Home'){props.history.push('/')}
              else if(navLink === 'Log out'){
                  Axios.post('/auth/logout').then(() => props.history.push('/'))
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
