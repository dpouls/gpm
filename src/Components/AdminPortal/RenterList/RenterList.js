import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Table from 'react-bootstrap/Table'
import './RenterList.scss'

const RenterList = () => {
  const [allRenters, setAllRenters] = useState([]);
  useEffect(() => {
    Axios.get("/api/renters")
      .then((res) => setAllRenters(res.data))
      .catch((err) => console.log(err));
  }, []);
  // this is where a list of all the renters will go. work in progress!
  return allRenters.length > 0 ? (
    <Table id='renter-list-table' striped bordered hover responsive variant='dark'>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th className="email">Email</th>
        </tr>
        </thead> 
        <tbody>
      {allRenters.map((el) => {
        
        return (
          <tr>
          <td>{el.first_name}</td>
          <td>{el.last_name}</td>
          <td>{el.phone_number}</td>
          <td className="email">{el.email}</td>
        </tr>
      )
    }
      )
    }
    </tbody>
    </Table>
    ) : (
      <Spinner
      animation="border"
      variant="black"
      style={{ height: "30px", width: "30px" }}
      
      />
      );
};

export default withRouter(RenterList);
