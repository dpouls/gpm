import Axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Table from 'react-bootstrap/Table'
import './MRList.scss'

const MRList = () => {
    const [allRequests, setAllRequests] = useState([]);
    useEffect(() => {
      Axios.get("/api/requests")
        .then((res) => setAllRequests(res.data))
        .catch((err) => console.log(err));
    }, []);
    // this is where a list of all the Requests will go.
    return allRequests.length > 0 ? (
      <Table id='request-list-table' size='sm' striped hover responsive variant='dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Address</th >
            <th>City</th >
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Complete</th>
          </tr>
          </thead> 
          <tbody>
        {allRequests.sort((a,b) => a.is_complete - b.is_complete).sort((a,b) => b.emergency - a.emergency).map((el) => {
            
            let requestContent = el.request_text_content.slice(0,20)
          return (
            <tr id={el.emergency ? 'emergency-request': el.is_complete ? 'complete-request' : 'not-complete-request'}>
            <td>{el.request_id}</td>
            <td className='table_request-content'>{el.request_text_content.length > 20 ? requestContent + '...' : requestContent }</td>
            <td>{el.street_address}</td>
            <td>{el.city}</td>
            <td>{el.first_name}</td>
            <td>{el.last_name}</td>
            <td>{el.phone_number}</td>
            <td>{el.email}</td>
            <td>{el.is_complete ? "Yes": "No"}</td>
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
}

export default withRouter(MRList);
