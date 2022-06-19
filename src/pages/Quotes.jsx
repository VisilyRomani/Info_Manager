

function Quotes() {
  // const [jobs, setJobs] = useState([]);
  // const [clientID, setClientID] = useState([]);

  // const fetchJob = async () => {
  //   await axios
  //     .get("/alljobdata", { withCredentials: true })
  //     .then((response) => {
  //       setJobs(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const fetchClient = async () => {
  //   await axios
  //     .post("/getclients", { withCredentials: true })
  //     .then((response) => {
  //       let formattedClients = [];
  //       response.data.map((item, index) => {
  //         return formattedClients.push({
  //           value: item.client_id,
  //           label: item.client_name,
  //         });
  //       });

  //       setClientID(formattedClients);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const submitQuote = async (values) => {
  //   await axios
  //     .put("/newquote", values, { withCredentials: true })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     fetchJob();
  //     fetchClient();
  //   }
  //   return () => {
  //     setJobs();
  //     setClientID();
  //     isMounted = false;
  //   };
  // }, []);

  // const validationSchema = Yup.object().shape({
  //   client: Yup.string().required("*Client is required"),
  //   descr: Yup.string()
  //     .min(2, "*Description must have at least 2 characters")
  //     .required("*Description is required"),
  //   bookDate: Yup.date().required("*Book Date is required"),
  //   quote: Yup.number().required("*Quote is required"),
  // });

  // const columns = [
  //   {
  //     dataField: "client_name",
  //     text: "Client Name",
  //   },
  //   {
  //     dataField: "job_description",
  //     text: "Job Description",
  //   },
  //   {
  //     dataField: "book_date",
  //     text: "Book Date",
  //     sort: true,
  //   },
  //   {
  //     dataField: "quote",
  //     text: "Quote Price",
  //   },
  // ];

  // return (
  //   <div className="fade-body">
  //     <h1>Quotes</h1>
  //     <Container>
  //       <Formik
  //         validationSchema={validationSchema}
  //         initialValues={{
  //           client: "",
  //           descr: "",
  //           bookDate: "",
  //           quote: "",
  //         }}
  //         onSubmit={(values, { setSubmitting, resetForm }) => {
  //           setSubmitting(true);
  //           submitQuote(values);
  //           resetForm();
  //           setSubmitting(false);
  //         }}
  //       >
  //         {({
  //           values,
  //           errors,
  //           touched,
  //           handleChange,
  //           handleBlur,
  //           handleSubmit,
  //           isSubmitting,
  //         }) => (
  //           <Form onSubmit={handleSubmit}>
  //             <FormGroup className="form-group">
  //               <Form.Label>Client</Form.Label>
  //               <Select
  //                 options={clientID}
  //                 onChange={(option) => (values.client = option.value)}
  //                 className={touched.client && errors.client ? "error" : null}
  //               />
  //               {touched.client && errors.client ? (
  //                 <div className="error-message">{errors.client}</div>
  //               ) : null}
  //             </FormGroup>
  //             <FormGroup className="form-group">
  //               <Form.Label>Job Description</Form.Label>
  //               <Field
  //                 name="descr"
  //                 as="textarea"
  //                 className={[
  //                   touched.bookDate && errors.bookDate ? "error" : null,
  //                   "form-control",
  //                 ].join(" ")}
  //               />
  //               {touched.descr && errors.descr ? (
  //                 <div className="error-message">{errors.descr}</div>
  //               ) : null}
  //             </FormGroup>
  //             <FormGroup className="form-group">
  //               <Form.Label>Book Date</Form.Label>
  //               <Form.Control
  //                 name="bookDate"
  //                 type="date"
  //                 onChange={handleChange}
  //                 onBlur={handleBlur}
  //                 value={values.bookDate}
  //                 placeholder="Enter Book Date"
  //                 className={
  //                   touched.bookDate && errors.bookDate ? "error" : null
  //                 }
  //               />
  //               {touched.bookDate && errors.bookDate ? (
  //                 <div className="error-message">{errors.bookDate}</div>
  //               ) : null}
  //             </FormGroup>
  //             <FormGroup className="form-group">
  //               <Form.Label>Quote</Form.Label>
  //               <Form.Control
  //                 name="quote"
  //                 onChange={handleChange}
  //                 onBlur={handleBlur}
  //                 value={values.quote}
  //                 placeholder="Enter Quote"
  //                 className={touched.quote && errors.quote ? "error" : null}
  //               />
  //               {touched.quote && errors.quote ? (
  //                 <div className="error-message">{errors.quote}</div>
  //               ) : null}
  //             </FormGroup>
  //             <Button variant="primary" type="submit" disabled={isSubmitting}>
  //               Submit
  //             </Button>
  //           </Form>
  //         )}
  //       </Formik>
  //     </Container>
  //     <Container>
  //       <BootstrapTable
  //         keyField="job_id"
  //         data={jobs}
  //         columns={columns}
  //         pagination={paginationFactory({ sizePerPage: 5 })}
  //       />
  //     </Container>
  //   </div>
  // );
}

export default Quotes;
