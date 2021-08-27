import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./LandlordPortal.scss";
import NewRenter from "./NewRenter/NewRenter";
import RenterList from "./RenterList/RenterList";
import PropertyList from "./PropertyList/PropertyList";
import NewProperty from "./NewProperty/NewProperty";
import MRList from './MRList/MRList'

const AdminPortal = (props) => {
  //Makes sure the user has admin authorization on mounting
  useEffect(() => {
    Axios.get("/api/renter").then((res) => {
      if (!res.data.is_landlord) {
        Axios.post("/auth/logout").then(props.history.push("/"));
      }
      
    })
    .catch(err => props.history.push('/login'))
  }, []);

  //declare state variables
  const [rentersClicked, toggleRentersClicked] = useState(false);
  const [currentRentersClicked, toggleCRClicked] = useState(false);
  const [newRenterClicked, toggleNRClicked] = useState(false);
  const [propertiesClicked, togglePropertiesClicked] = useState(false);
  const [allPropertiesClicked, toggleAPClicked] = useState(false);
  const [newPropertyClicked, toggleNPClicked] = useState(false);
  const [paymentsClicked, togglePaymentsClicked] = useState(false);
  const [mRClicked, toggleMRClicked] = useState(false);
  const [curMRClicked, toggleCurMRClicked] = useState(false)

  return (
    <div className="admin-portal">
      <button onClick={() => toggleRentersClicked(!rentersClicked)}>
        Renters
      </button>
      {rentersClicked ? (
        <div>
          <div className="sub-button-container">
            <button id="sub-button"
            onClick={() => toggleCRClicked(!currentRentersClicked)}> See Current Renters</button>
            {currentRentersClicked ? (
              <RenterList />
            ) : (
              null
            )}
            <button
              id="sub-button"
              onClick={() => toggleNRClicked(!newRenterClicked)}
            >
              Add a New Renter
            </button>
          {newRenterClicked ? <NewRenter rentersClickedFn={toggleRentersClicked} newRenterClickedFn={toggleNRClicked} /> : null}
          </div>
        </div>
      ) : null}
      <button onClick={() => togglePropertiesClicked(!propertiesClicked)}>
        Properties
      </button>
      {propertiesClicked ? (
        <div className="sub-button-container">
          <button id="sub-button" onClick={() => toggleAPClicked(!allPropertiesClicked)}>See Current Properties</button>
            {allPropertiesClicked ? (
              <PropertyList/>
            ) : null}
          <button id="sub-button" onClick={() => toggleNPClicked(!newPropertyClicked)}>Add a New Property</button>
            {newPropertyClicked ? (
              <NewProperty/>
            ) : null}
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
          <button id="sub-button" onClick={() => toggleCurMRClicked(!curMRClicked)}>See Current Maintenance Requests</button>
          {curMRClicked ? (<MRList/>) : null}
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(AdminPortal);
