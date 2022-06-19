

import * as Yup from "yup";

function Client() {
  // const [client, setClient] = useState([]);
  // const mountedRef = useRef(true);

  // const fetchClient = async () => {
  //   await axios
  //     .post("/getclients", { withCredentials: true })
  //     .then((response) => {
  //       setClient(response.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const addClient = async (client, values) => {
  //   await axios
  //     .post("/newclient", { data: values }, { withCredentials: true })
  //     .then((response) => {
  //       console.log("success");
  //       let newList = client;
  //       let newItem = {
  //         client_name: values.clientName,
  //         addr: values.clientAddress,
  //         phone_num: values.clientNumber,
  //         email: values.clientEmail,
  //         sprinklers: values.clientSprinkler,
  //       };
  //       newList.push(newItem);
  //       setClient(newList);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // useEffect(() => {
  //   fetchClient();
  //   return () => {
  //     setClient([]);
  //     mountedRef.current = false;
  //   };
  // }, []);

  // const validationSchema = Yup.object().shape({
  //   clientName: Yup.string()
  //     .min(2, "*Names must have at least 2 characters")
  //     .max(100, "*Names can't be longer than 100 characters")
  //     .required("*Name is required"),
  //   clientAddress: Yup.string().required("*Address is required"),
  //   clientNumber: Yup.string(),
  //   clientEmail: Yup.string()
  //     .email("*Must be a valid email address")
  //     .max(100, "*Email must be less than 100 characters"),
  //   clientSprinkler: Yup.string().required(),
  // });
  // const columns = [
  //   {
  //     dataField: "client_name",
  //     text: "Client Name",
  //   },
  //   {
  //     dataField: "addr",
  //     text: "Address",
  //   },
  //   {
  //     dataField: "email",
  //     text: "Email",
  //   },
  //   {
  //     dataField: "phone_num",
  //     text: "Phone Number",
  //   },
  //   {
  //     dataField: "sprinklers",
  //     text: "Sprinklers",
  //   },
  // ];

  // return (
  //   <div className="fade-body">
  //     <h1>Client</h1>
  //     <Container>
  //       <Formik
  //         validationSchema={validationSchema}
  //         initialValues={{
  //           clientName: "",
  //           clientAddress: "",
  //           clientNumber: "",
  //           clientEmail: "",
  //           clientSprinkler: "",
  //         }}
  //         onSubmit={(values, { setSubmitting, resetForm }) => {
  //           setSubmitting(true);
  //           addClient(client, values);
  //           resetForm();
  //           fetchClient();
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
  //           <Form onSubmit={handleSubmit} id="clientForm">
  //             <div id="formCol1">
  //               <FormGroup className="form-group">
  //                 <Form.Label>Name</Form.Label>
  //                 <Form.Control
  //                   name="clientName"
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                   value={values.clientName}
  //                   placeholder="Enter Name"
  //                   className={
  //                     touched.clientName && errors.clientName ? "error" : null
  //                   }
  //                 />
  //                 {touched.clientName && errors.clientName ? (
  //                   <div className="error-message">{errors.clientName}</div>
  //                 ) : null}
  //               </FormGroup>
  //               <FormGroup className="form-group">
  //                 <Form.Label>Address</Form.Label>
  //                 <Form.Control
  //                   name="clientAddress"
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                   value={values.clientAddress}
  //                   placeholder="Enter Address"
  //                   className={
  //                     touched.clientAddress && errors.clientAddress
  //                       ? "error"
  //                       : null
  //                   }
  //                 />
  //                 {touched.clientAddress && errors.clientAddress ? (
  //                   <div className="error-message">{errors.clientAddress}</div>
  //                 ) : null}
  //               </FormGroup>
  //               <FormGroup className="form-group">
  //                 <Form.Label>Number</Form.Label>
  //                 <Form.Control
  //                   name="clientNumber"
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                   value={values.clientNumber}
  //                   placeholder="Enter Number"
  //                   className={
  //                     touched.clientNumber && errors.clientNumber
  //                       ? "error"
  //                       : null
  //                   }
  //                 />
  //                 {touched.clientNumber && errors.clientNumber ? (
  //                   <div className="error-message">{errors.clientNumber}</div>
  //                 ) : null}
  //               </FormGroup>
  //             </div>

  //             <div id="formCol2">
  //               <FormGroup className="form-group">
  //                 <Form.Label>Email</Form.Label>
  //                 <Form.Control
  //                   name="clientEmail"
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                   value={values.clientEmail}
  //                   placeholder="Enter Email"
  //                   className={
  //                     touched.clientEmail && errors.clientEmail ? "error" : null
  //                   }
  //                 />
  //                 {touched.clientEmail && errors.clientEmail ? (
  //                   <div className="error-message">
  //                     {errors.naclientEmailme}
  //                   </div>
  //                 ) : null}
  //               </FormGroup>
  //               <FormGroup className="form-group">
  //                 <Form.Label>Sprinkers</Form.Label>
  //                 <Form.Control
  //                   name="clientSprinkler"
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                   value={values.clientSprinkler}
  //                   placeholder="Sprinklers"
  //                   className={
  //                     touched.clientSprinkler && errors.clientSprinkler
  //                       ? "error"
  //                       : null
  //                   }
  //                 />
  //                 {touched.clientSprinkler && errors.clientSprinkler ? (
  //                   <div className="error-message">
  //                     {errors.clientSprinkler}
  //                   </div>
  //                 ) : null}
  //               </FormGroup>
  //               <Button variant="primary" type="submit" disabled={isSubmitting}>
  //                 Submit
  //               </Button>
  //             </div>
  //           </Form>
  //         )}
  //       </Formik>
  //     </Container>
  //     <Container>
  //         keyField="client_id"
  //         data={client}
  //         columns={columns}
  //         pagination={paginationFactory({ sizePerPage: 5 })}
  //       />
  //     </Container>
  //   </div>
  // );
}

export default Client;
