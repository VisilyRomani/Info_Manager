import React, {useState} from "react";
import authService from "./authService";
import Logo from "../../asset/Sprouts-Logo-Front-BG.jpg";
import BG from "../../asset/background2.jpg";

import { useHistory } from "react-router";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade"
import Alert from "@mui/material/Alert"
import Portal from '@mui/material/Portal'
import Paper from '@mui/material/Paper'

const LoginPage = (props) => {
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
        <Container sx={{display:"flex", flexDirection:'row-reverse', flexWrap:'wrap', justifyContent:'center'}}>
        <img style={{filter:'invert(1)', 'width':'300px'}} src={Logo}/>
          <Formik
            initialValues={{email:'', password:''}}
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
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              authService.login(values.email, values.password).then(
                      (data) => {
                        setSubmitting(false)
                        props.history.push("/home");
                      }
                    ).catch((error) => {
                      setSubmitting(false)
                      setSevereError({view:true, error:error.toString()})
                    });
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
          <form onSubmit={handleSubmit} style={{width:'fit-content'}}>
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
            <div style={{ marginTop:'10px'}}>
              <Button
              size="small"
                label="register"
                onClick={() => history.push("/register")}>
                  create an account
              </Button>
              <Button type="submit" variant="outlined" disabled={isSubmitting}>
                Log In
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

export default LoginPage;
