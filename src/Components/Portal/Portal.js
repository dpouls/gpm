import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import './Portal.scss'

const Portal = (props) => {
  useEffect(() => {
    getUserInfo();
  }, []);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    setLoading(true);
    Axios.get("/api/user")
      .then((res) => {
        setCurrentUser(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='portal-page-container'>
      {loading ? (
        <Spinner animation="border" variant="primary" size='xl' />
      ) : (
        <div className='user-info-box'>
            <p>Hello {currentUser.username}</p>
        </div>
      )}
    </div>
  );
};

export default Portal;
