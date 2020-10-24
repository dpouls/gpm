import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";


const RenterList = () => {
  const [allRenters, setAllRenters] = useState([]);
  useEffect(() => {
    Axios.get("/api/renters")
      .then((res) => setAllRenters(res.data))
      .catch((err) => console.log(err));
  }, []);
  // this is where a list of all the renters will go. work in progress! 
  return allRenters.length > 0 ? allRenters.map((el) => {
      return(
      <div>{el.first_name}</div>
      )
  }) :<Spinner
  animation="border"
  variant="black"
  style={{ height: "30px", width: "30px" }}
/>;
};

export default RenterList;
