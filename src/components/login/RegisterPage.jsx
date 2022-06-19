import React, {useState} from "react";
import authService from "./authService";
import Logo from "../../asset/Sprouts-Logo-Front-BG.jpg";
import { useHistory } from "react-router";
import TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import Container from "@mui/material/Container";
import { Formik } from "formik";
import { Fade, Portal, Typography, Paper } from "@mui/material";

const RegisterPage = (props) => {
  let history = useHistory();
  let [severeError, setSevereError] = useState({view:false, error:''});

  return (
    <div style={{display:'flex',justifyContent:'center', marginTop:'20%'}}>  
      <Portal>
        <Fade in={severeError.view}>
          <Alert severity="error" onClose={() => {setSevereError({view:false,error:''})}}>{severeError.error.toString()}</Alert>
        </Fade>
      </Portal>

      <Paper elevation={3} sx={{display:'flex', flexDirection:'column', justifyContent:'center',width:'fit-content', padding:'15px'}}>
        <Container sx={{display:"flex", flexDirection:'row-reverse', alignItems:'center', flexWrap:'wrap', justifyContent:'center'}}>
          <img style={{filter:'invert(1)', 'width':'300px'}} src={Logo}/>
          <Formik
            initialValues={{email:'', password:'', firstName:'',lastName:''}}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              if (!values.password) {
                errors.password = 'Required';
              }

              if (!values.firstName) {
                errors.firstName = 'Required';
              }else if (
                !/^[a-zA-Z]+$/i.test(values.firstName)
              ){
                errors.firstName = 'Invalid first name'
              }

              if (!values.lastName) {
                errors.lastName = 'Required';
              }else if (
                !/^[a-zA-Z]+$/i.test(values.lastName)
              ){
                errors.lastName = 'Invalid last name'
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              authService.register(values.email, values.password, values.firstName, values.lastName).then(
                      () => {
                        setSubmitting(false)
                        props.history.push("/");
                      }
                    ).catch((error)=>{
                      console.log(error)
                      setSubmitting(false)
                      setSevereError({view:true, error:error})
                    })
            }}
          >

          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          }) => (
          <form onSubmit={handleSubmit}>
            <TextField  
              variant="standard"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              label="Email"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <br/>
            <TextField  
              variant="standard"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              label="Password"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <br/>
            <TextField  
              variant="standard"
              type="firstName"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              label="First Name"
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <br/>
            <TextField  
              variant="standard"
              type="lastName"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              label="Last Name"
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <div style={{ marginTop:'10px'}}>
              <Button
              label="Login"
              onClick={() => history.push("/")}>
                Back to Login
              </Button>

              <Button type="submit" variant="outlined" disabled={isSubmitting}>
                Register
              </Button>
            </div>
          </form>
          )}
          </Formik>
        </Container>
      </Paper>
    </div>
  );
};
export default RegisterPage;
