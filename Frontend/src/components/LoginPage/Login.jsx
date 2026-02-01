import React, { useState, useEffect } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import "./login.scss";
import { Navigate } from "react-router-dom";

function Login() {
  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const [input, setInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [toHome, setToHome] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(input));
    setIsSubmit(true);
  };

  const validateForm = (values) => {
    const errors = {};

    const urlRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (values.emailAddress === "") {
      errors.emailAddress = "Email address is required";
    } else if (
      values.emailAddress !== "" &&
      urlRegex.test(values.emailAddress) !== true
    ) {
      errors.emailAddress = "Email address is incorrect";
    }

    if (values.password === "") {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleLogin = (loginDetails) => {
    console.log("handleLoginCalled");
    fetch("http://localhost:8000/api/login/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setToHome(true);
        }
      });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setInput(initialValues);
      handleLogin(input);
    }
  }, [formErrors, isSubmit]);

  if (toHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="loginMainContainer">
      <div className="loginContainer">
        <div className="loginInfoContainer">
          <img src={bookMarkImage} alt="" className="loginHeaderIcon" />
          <h1 className="loginHeading">Log in to your account</h1>
          <p className="loginPara">Welcome back! Please enter your details</p>
        </div>

        <form onSubmit={onSubmit} className="loginForm">
          <div className="formFieldContainer">
            <div className="formFields">
              <label htmlFor="" className="loginLabel">
                Email address <span className="loginArticks">*</span>
              </label>
              <input
                type="text"
                name="emailAddress"
                value={input.emailAddress}
                onChange={handleChange}
                maxLength={30}
                className={
                  formErrors.emailAddress ? "formErrorBorder" : "formInput"
                }
              />
              <p className="formErrorText">{formErrors.emailAddress}</p>
            </div>
            <div className="formFields">
              <label htmlFor="" className="loginLabel">
                Password <span className="loginArticks">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                maxLength={30}
                className={
                  formErrors.password ? "formErrorBorder" : "formInput"
                }
              />
              <p className="formErrorText">{formErrors.password}</p>
            </div>
            <div className="formButtonContainer">
              <button type="submit" className="loginSubmit">
                Log in
              </button>
            </div>
            <p className="loginFooterText">
              Forgot password? <span className="loginLogin">Reset It</span>
              <br />
              Don&apos;t have an account?{" "}
              <span className="loginLogin">Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
