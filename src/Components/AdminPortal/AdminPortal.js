import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./AdminPortal.scss";

const AdminPortal = (props) => {
  useEffect(() => {
    Axios.get("/api/user").then((res) => {
      console.log("admin resdata");
      if (!res.data.isadmin) {
        Axios.post("/auth/logout").then(props.history.push("/"));
      }
    });
  }, []);
  const [rentersClicked, toggleRentersClicked] = useState(true);
  const [newRenterClicked, toggleNRClicked] = useState(true);
  const [newRenterForm, setNewRenterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    occupants: "",
    isadmin: false
  });

  const [propertiesClicked, togglePropertiesClicked] = useState(false);
  const [paymentsClicked, togglePaymentsClicked] = useState(false);
  const [mRClicked, toggleMRClicked] = useState(false);

  return (
    <div className="admin-portal">
      <button onClick={() => toggleRentersClicked(!rentersClicked)}>
        Renters
      </button>
      {rentersClicked ? (
        <div>
          <div className="sub-button-container">
            <button id="sub-button">See Current Renters</button>
            <button
              id="sub-button"
              onClick={() => toggleNRClicked(!newRenterClicked)}
            >
              Add a New Renter
            </button>
          </div>
          {newRenterClicked ? (
            <form className="new-renter-form">
              <label for="firstName">First Name</label>
              <input name="firstName" type="text" />
              <label for="lastName">Last Name</label>
              <input name="firstName" type="text" />
              <label for="email">Email</label>
              <input name="email" type="email" />
              <label for="phoneNumber">Phone Number</label>
              <input name="phoneNumber" type="text" />
              <label for="username">Username</label>
              <input name="username" type="text" />
              <label for="password">Password</label>
              <input name="password" type="password" />
              <label for="occupants">Occupants</label>
              <input name="occupants" type="number" />
              <label className="container">
                Admin:
                <input type="checkbox" />
              </label>
            </form>
          ) : null}
        </div>
      ) : null}
      <button onClick={() => togglePropertiesClicked(!propertiesClicked)}>
        Properties
      </button>
      {propertiesClicked ? (
        <div className="sub-button-container">
          <button id="sub-button">See Current Properties</button>
          <button id="sub-button">Add a New Property</button>
        </div>
      ) : null}
      <button onClick={() => togglePaymentsClicked(!paymentsClicked)}>
        Payments
      </button>
      {paymentsClicked ? (
        <div className="sub-button-container">
          <button id="sub-button">See All Payments</button>
        </div>
      ) : null}
      <button onClick={() => toggleMRClicked(!mRClicked)}>
        Maintenance Requests
      </button>
      {mRClicked ? (
        <div className="sub-button-container">
          <button id="sub-button">See Current Maintenance Requests</button>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(AdminPortal);
