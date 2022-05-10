import axios from "axios";
import React, { useEffect, useState } from "react";
import {Form,FormGroup, Button, Container} from "react-bootstrap";
import "../css/Client.css"
import {Formik} from "formik";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as Yup from 'yup';
function Client() {
    // TODO: fix unique key prop for table
  const [client, setClient] = useState([]);

  const fetchClient = () => {
      axios.post("/getclients",{ withCredentials: true }).then((response)=>{
        setClient(response.data);
    }).catch((err) => {
      console.error(err);
    });
  }

  const addClient = (client, values) => {
    axios.post("/newclient",{data:values},{ withCredentials: true }).then((response)=>{
      console.log("success")
      let newList = client;
      let newItem = {client_name:values.clientName,
      addr:values.clientAddress,
      phone_num:values.clientNumber,
      email:values.clientEmail,
      sprinklers:values.clientSprinkler}
      newList.push(newItem)
      setClient(newList)
    }).catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      fetchClient();
    }
      return () => {
        setClient([]);
        isMounted = false;}
  },[]);

  const validationSchema = Yup.object().shape({
    clientName: Yup.string().min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
    clientAddress: Yup.string().required("*Address is required"),
    clientNumber: Yup.string(),
    clientEmail: Yup.string().email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters"),
    clientSprinkler: Yup.string().required()
  });
  const columns = [
    {
      dataField: "client_name",
      text: "Client Name",
    },
    {
      dataField: "addr",
      text: "Address"
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "phone_num",
      text: "Phone Number"
    },
    {
      dataField: "sprinklers",
      text: "Sprinklers"
    },
  ];

  return (
    <div>
      <h1>Client</h1>
      <Container>
        <Formik validationSchema={validationSchema}
        initialValues={{
          clientName:'',
          clientAddress:'',
          clientNumber:'',
          clientEmail:'',
          clientSprinkler:''
          }}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            // Resets form after submission is complete            
            addClient(client, values);
            resetForm();
            fetchClient();
            setSubmitting(false);
        }}>

          {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) =>(
          <Form onSubmit={handleSubmit} id="clientForm">
          <div id="formCol1">
            <FormGroup className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control 
              name="clientName" 
              onChange={handleChange} 
              onBlur={handleBlur} 
              value={values.clientName} 
              placeholder="Enter Name"
              className={touched.clientName && errors.clientName ? "error" : null}/>
              {touched.clientName && errors.clientName ? (<div className="error-message">{errors.clientName}</div>): null}
            </FormGroup>
            <FormGroup className="form-group">
              <Form.Label>Address</Form.Label>
              <Form.Control 
              name="clientAddress" 
              onChange={handleChange} 
              onBlur={handleBlur} 
              value={values.clientAddress} 
              placeholder="Enter Address" 
              className={touched.clientAddress && errors.clientAddress ? "error" : null}/>
              {touched.clientAddress && errors.clientAddress ? (<div className="error-message">{errors.clientAddress}</div>): null}
            </FormGroup>
            <FormGroup className="form-group">
              <Form.Label>Number</Form.Label>
              <Form.Control 
              name="clientNumber" 
              onChange={handleChange}
              onBlur={handleBlur} 
              value={values.clientNumber} 
              placeholder="Enter Number"
              className={touched.clientNumber && errors.clientNumber ? "error" : null} />
              {touched.clientNumber && errors.clientNumber ? (<div className="error-message">{errors.clientNumber}</div>): null}
            </FormGroup>
            </div>

            <div id="formCol2">
              <FormGroup className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                name="clientEmail" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.clientEmail} 
                placeholder="Enter Email"
                className={touched.clientEmail && errors.clientEmail ? "error" : null} />
                {touched.clientEmail && errors.clientEmail ? (<div className="error-message">{errors.naclientEmailme}</div>): null}
              </FormGroup>
              <FormGroup className="form-group">
                <Form.Label>Sprinkers</Form.Label>
                <Form.Control 
                name="clientSprinkler" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.clientSprinkler} 
                placeholder="Sprinklers"
                className={touched.clientSprinkler && errors.clientSprinkler ? "error" : null} />
                {touched.clientSprinkler && errors.clientSprinkler ? (<div className="error-message">{errors.clientSprinkler}</div>): null}
              </FormGroup>
              <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
            </div>
          </Form>
          )}
        </Formik>
      </Container>
      <Container>

      <BootstrapTable keyField='client_id' data={client} columns={ columns } pagination={paginationFactory({ sizePerPage: 5 })} />

    {/* <Table responsive>
      <thead>
        <tr>
          <th key={0}>Name</th>
          <th key={1}>Address</th>
          <th key={2}>Email</th>
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
    </Table> */}
      </Container>
    </div>
  );
}


export default Client;
