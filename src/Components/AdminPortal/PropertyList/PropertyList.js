import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Table from 'react-bootstrap/Table'
import './PropertyList.scss'

const PropertyList = () => {
  const [allProperties, setAllProperties] = useState([]);
  useEffect(() => {
    Axios.get("/api/properties")
      .then((res) => setAllProperties(res.data))
      .catch((err) => console.log(err));
  }, []);
  return allProperties.length > 0 ? (
    <Table id='property-list-table' size='sm' striped hover responsive variant='dark'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Street Address</th>
          <th>City</th>
          <th>Price</th>
          <th className='occupants'>Occupied</th>
        </tr>
        </thead> 
        <tbody>
      {allProperties.map((el,i) => {
        return (
          <tr key={i}>
          <td>{el.property_id}</td>
          <td>{el.street_address}</td>
          <td>{el.city}</td>
          <td>${el.rental_price}</td>
          <td className='occupants'>{el.occupied ? "Yes": "No"}</td>
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

export default withRouter(PropertyList);
