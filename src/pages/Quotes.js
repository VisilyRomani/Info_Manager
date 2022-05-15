import React, { useEffect, useState } from "react";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import { Formik, Field } from "formik";
import Select from "react-select";
import axios from "axios";
import * as Yup from "yup";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../css/Quote.css";

// Quote webpage Component
function Quotes() {
  // Declare state variables
  const [jobs, setJobs] = useState([]);
  const [clientID, setClientID] = useState([]);

  /**
   * Fetch job data from Express Server
   */
  const fetchJob = async () => {
    await axios
      .get("/alljobdata", { withCredentials: true })
      .then((response) => {
        // Set response information from GET request to state
        setJobs(response.data);

        // Catch errors
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Fetch client information for dropdown
   */
  const fetchClient = async () => {
    await axios
      .post("/getclients", { withCredentials: true })
      .then((response) => {
        // Format used by react-select
        let formattedClients = [];

        // Map client data, format into value label and push to formatedClients
        response.data.map((item, index) => {
          return formattedClients.push({
            value: item.client_id,
            label: item.client_name,
          });
        });

        // Set formatted client information into state
        setClientID(formattedClients);

        // Catch errors
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Submit new quote form information to server
   * @param {values} values of the quote form from Formik
   */
  const submitQuote = async (values) => {
    await axios
      .put("/newquote", values, { withCredentials: true })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * Sets initial state for the quote component
   */
  useEffect(() => {
    let isMounted = true;
    // Check for if the component is mounted, if so fetch job and client information
    if (isMounted) {
      fetchJob();
      fetchClient();
    }
    return () => {
      // When component is unmounted clear state
      setJobs();
      setClientID();
      isMounted = false;
    };
  }, []);

  /**
   * Validation schema for Yup, used to validate quote form
   */
  const validationSchema = Yup.object().shape({
    client: Yup.string().required("*Client is required"),
    descr: Yup.string()
      .min(2, "*Description must have at least 2 characters")
      .required("*Description is required"),
    bookDate: Yup.date().required("*Book Date is required"),
    quote: Yup.number().required("*Quote is required"),
  });

  // Column titles for dynamically generated table
  const columns = [
    {
      dataField: "client_name",
      text: "Client Name",
    },
    {
      dataField: "job_description",
      text: "Job Description",
    },
    {
      dataField: "book_date",
      text: "Book Date",
      sort: true,
    },
    {
      dataField: "quote",
      text: "Quote Price",
    },
  ];

  return (
    <div className="fade-body">
      <h1>Quotes</h1>
      <Container>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            client: "",
            descr: "",
            bookDate: "",
            quote: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            submitQuote(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {
            // Callback function for form handling
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup className="form-group">
                  <Form.Label>Client</Form.Label>
                  <Select
                    options={clientID}
                    onChange={(option) => (values.client = option.value)}
                    className={touched.client && errors.client ? "error" : null}
                  />
                  {touched.client && errors.client ? (
                    <div className="error-message">{errors.client}</div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label>Job Description</Form.Label>
                  <Field
                    name="descr"
                    as="textarea"
                    className={[
                      touched.bookDate && errors.bookDate ? "error" : null,
                      "form-control",
                    ].join(" ")}
                  />
                  {touched.descr && errors.descr ? (
                    <div className="error-message">{errors.descr}</div>
                  ) : null}
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
                    className={
                      touched.bookDate && errors.bookDate ? "error" : null
                    }
                  />
                  {touched.bookDate && errors.bookDate ? (
                    <div className="error-message">{errors.bookDate}</div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Label>Quote</Form.Label>
                  <Form.Control
                    name="quote"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quote}
                    placeholder="Enter Quote"
                    className={touched.quote && errors.quote ? "error" : null}
                  />
                  {touched.quote && errors.quote ? (
                    <div className="error-message">{errors.quote}</div>
                  ) : null}
                </FormGroup>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )
          }
        </Formik>
      </Container>
      <Container>
        <BootstrapTable
          keyField="job_id"
          data={jobs}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
      </Container>
    </div>
  );
}

export default Quotes;
