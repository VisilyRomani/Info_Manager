import React, { useEffect, useState } from "react";
import {Form, FormGroup, Button, Container} from "react-bootstrap";
import {Formik, Field} from "formik";
import Select from 'react-select'
import axios from "axios";
import * as Yup from 'yup';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "../css/Quote.css"


function Quotes() {
  const [jobs, setJobs] = useState([]);
  const [clientID, setClientID] = useState([]);

  const fetchJob = () => {
    axios.get("/alljobdata",{ withCredentials: true }).then((response)=>{
      response.data.map((item) => {
        let a = new Date(item.book_date);
        let month = a.getUTCMonth() + 1; //months from 1-12
        let day = a.getUTCDate();
        let year = a.getUTCFullYear();
        let newdate = year + "/" + month + "/" + day;  
        item.book_date = newdate;
        return item.book_date;
      });
      setJobs(response.data);
  }).catch((err) => {
    console.log(err);
  });
  }

  const fetchClient = () => {
    axios.get("/clients",{ withCredentials: true }).then((response)=>{
      let preData = response.data;
      let postData = [];

      preData.map((item, index) => {
        return postData.push({value: item.client_id, label: item.client_name});
      })

      setClientID(postData);
  }).catch((err) => {
    console.log(err);
  });
  }


  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      fetchJob();
      fetchClient();
    }
      return () => {
        setJobs();
        setClientID();
        isMounted = false;}
  },[]);

  const validationSchema = Yup.object().shape({
    client:  Yup.string().required("*Client is required"),
    descr: Yup.string().min(2, "*Description must have at least 2 characters")
    .required("*Description is required"),
    bookDate: Yup.date().required("*Book Date is required"),
    Quote:  Yup.number().required("*Quote is required")
  });

  const submitQuote = (values) => {
    axios.put("/newquote", values, { withCredentials: true }).then((e) => {
      console.log(e);
    })
  }

  const columns = [
    {
      dataField: "client_name",
      text: "Client Name",
    },
    {
      dataField: "job_description",
      text: "Job Description"
    },
    {
      dataField: "book_date",
      text: "Book Date",
      sort: true
    },
    {
      dataField: "quote",
      text: "Quote Price"
    },
  ];


  return (
    <div>
      <h1>Quotes</h1>
      <Container>
        <Formik validationSchema={validationSchema}
          initialValues={{
            client:'',
            descr:'',
            bookDate:'',
            Quote:'',
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              // When button submits form and form is in the process of submitting, submit button is disabled
              setSubmitting(true);
              submitQuote(values);
              resetForm();
              setSubmitting(false);
          }}>

        {( {values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting }) =>(
          <Form onSubmit={handleSubmit}>
            <FormGroup className="form-group">
              <Form.Label>Client</Form.Label>
              <Select options={clientID} onChange={option => values.client = option.value} className={touched.client && errors.client ? "error" : null}/>
                {touched.client && errors.client ? (<div className="error-message">{errors.client}</div>): null}
            </FormGroup>
            <FormGroup className="form-group">
                <Form.Label>Job Description</Form.Label>
                <Field name="descr" as="textarea" className={[touched.bookDate && errors.bookDate ? "error" : null,"form-control"].join(' ')}/>
                {touched.descr && errors.descr ? (<div className="error-message">{errors.descr}</div>): null}
            </FormGroup>
              <FormGroup className="form-group">
                <Form.Label>Book Date</Form.Label>
                <Form.Control 
                name="bookDate" 
                type="date"
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.bookDate} 
                placeholder="Enter Book Date" 
                className={touched.bookDate && errors.bookDate ? "error" : null}/>
                {touched.bookDate && errors.bookDate ? (<div className="error-message">{errors.bookDate}</div>): null}
                
            </FormGroup>
              <FormGroup className="form-group">
                <Form.Label>Quote</Form.Label>
                <Form.Control 
                name="Quote" 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={values.Quote} 
                placeholder="Enter Quote" 
                className={touched.Quote && errors.Quote ? "error" : null}/>
                {touched.Quote && errors.Quote ? (<div className="error-message">{errors.Quote}</div>): null}
            </FormGroup>
            <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
          </Form>
          )}
        </Formik>
      </Container>
      <Container>
        <BootstrapTable keyField='job_id' data={jobs} columns={ columns } pagination={paginationFactory({ sizePerPage: 5 })} />
      </Container>
      
    </div>
  );
}

export default Quotes;
