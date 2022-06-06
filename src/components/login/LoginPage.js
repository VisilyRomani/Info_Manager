import React, { useState } from "react";
import authService from "./authService";
import Logo from "../../asset/Sprouts-Logo-Front-BG.jpg";
import "../../css/LoginPage.css";

const LoginPage = (props) => {
  const [input, setInput] = useState({ username: "", password: "" });
  const { username, password } = input;
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((inputs) => ({ ...inputs, [name]: value }));
  };

  const DismissableAlert = () => {
    if (show) {
      return <div className="DisAlert"> {message}</div>;
    } else {
      return <></>;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    if (!username || !password) {
      setMessage(" - This field is required.");
      setShow(true);
    } else {
      authService.login(username, password).then(
        (data) => {
          props.history.push("/home");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        }
      );
      if (!message) {
        setShow(true);
      }
    }
  };

  return (
    <div>
      <div className="bg" />
      <form onSubmit={handleLogin} className="loginForm formFlex ">
        <img className="logo" src={Logo} alt=""></img>

        <label htmlFor="username">Username :</label>
        <br />
        <DismissableAlert />
        <input
          type="text"
          id="username"
          name="username"
          className="loginInput "
          onChange={onChangeInput}
        ></input>

        <label htmlFor="password">Password:</label>
        <br />
        <DismissableAlert />

        <input
          type="password"
          id="password"
          name="password"
          className="loginInput "
          onChange={onChangeInput}
        ></input>
        <input type="submit" value="Submit" className="submitForm " />
      </form>
    </div>
  );
};
export default LoginPage;
