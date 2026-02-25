import React, { useState, useEffect } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import "./login.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { setToken } from "../../api/client";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const [input, setInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [toHome, setToHome] = useState(false);
  const [loginError, setLoginError] = useState("");

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

  const handleLogin = async (loginDetails) => {
    try {
      const data = await login(loginDetails);
      if (data?.token) {
        setToken(data.token);
      }
      setLoginError(data?.message || "");
      setToHome(true);
    } catch (error) {
      setLoginError(error?.message || "Login failed");
    }
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

  const redirectToPage = (pageName) => {
    navigate(`/${pageName}`);
  };

  return (
    <div className="loginMainContainer">
      <div className="loginContainer">
        <div className="loginInfoContainer">
          <img src={bookMarkImage} alt="" className="loginHeaderIcon" />
          <h1 className="loginHeading">Log in to your account</h1>
          <p className="loginPara">Welcome back! Please enter your details</p>
        </div>

        <div className="loginErrorContainer">
          <span className="loginError">{loginError}</span>
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
              Don&apos;t have an account?{" "}
              <span
                className="loginLogin"
                onClick={() => redirectToPage("register")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
