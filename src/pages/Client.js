import axios from "axios";
import React, { useEffect, useState } from "react";
import {Form,FormGroup, Button, Table} from "react-bootstrap";
import "../css/Client.css"
function Client() {
  const [client, setClient] = useState([]);

  useEffect(() => {
    let isMounted = true;
      axios.get("/clients",{ withCredentials: true }).then((response)=>{
        if(isMounted){
          console.log(response.data)
          setClient(response.data);
        }
      }).catch((err) => {
        console.error(err);
      });
      return () => {isMounted = false;}
  },[]);

//TODO: submit form to database

//TODO: format css

  return (
    <div>
      <h1>Client</h1>
      <div>
        <Form id="clientForm">
        <div id="formCol1">
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter Name" />
          </FormGroup>
          <FormGroup>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Enter Address" />
          </FormGroup>
          <FormGroup>
            <Form.Label>Number</Form.Label>
            <Form.Control placeholder="Enter Number" />
          </FormGroup>
          </div>

          <div id="formCol2">
            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="Enter Email" />
            </FormGroup>
            <FormGroup>
              <Form.Label>Sprinkers</Form.Label>
              <Form.Select>
                <option>Yes</option>
                <option>No</option>
              </Form.Select>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
      <div>
    <Table responsive>
      <thead>
        <tr>
          <th key={0}>Name</th>
          <th key={1}>Email</th>
          <th key={2}>Address</th>
          <th key={3}>Number</th>
          <th key={4}>Sprinkers</th>
        </tr>
      </thead>
      <tbody>
      {client.map((item, index) => (
              <tr>
                <td>{item.client_name}</td>
                <td>{item.addr}</td>
                <td>{item.email}</td>
                <td>{item.phone_num}</td>
                <td>{item.sprinklers}</td>
              </tr>
            ))}
      </tbody>
    </Table>
      </div>
    </div>
  );
}


export default Client;
