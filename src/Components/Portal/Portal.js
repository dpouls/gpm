import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "./Portal.scss";

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
        console.log(res.data);
        setCurrentUser(res.data);
        setLoading(false);
      })
      .catch((err) => props.history.push("/login"));
  };
  return (
    <div className="portal-page-container">
      {loading ? (
        <Spinner
          animation="border"
          variant="black"
          style={{ height: "300px", width: "300px" }}
        />
      ) : (
        <>
          <div className="user-info-box">
            <p>Hello {currentUser.first_name}!</p>
            <div>
              Total rent due: $
              {currentUser.pet
                ? parseInt(currentUser.rental_price) + 50
                : currentUser.rental_price}
            </div>
            <p>Due on: 17th</p>
          </div>

          <button>PAY MY RENT</button>

          <button onClick={() => console.log(currentUser)}>
            SUBMIT MAINTENANCE REQUEST
          </button>

          <img id="property-thumbnail" src={currentUser.thumbnail} alt="" />
          <div className="property-info-container">
            <span id="property-info-title">Property Information</span>
            <span>
              {currentUser.street_address} {currentUser.city}{" "}
              {currentUser.state}
            </span>
            <span>Bedrooms: {currentUser.bedrooms}</span>
            <span>Bathrooms: {currentUser.bathrooms}</span>
            <span>Montly Rent: ${currentUser.rental_price}</span>
            <span>Pet Fee: ${currentUser.pet ? 50 : "N/A"}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Portal;
