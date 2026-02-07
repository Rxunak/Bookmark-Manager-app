import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import "../RegisterPage/register.scss";
import { register } from "../../api/authApi";

function Register() {
  const initialValues = {
    fullName: "",
    emailAddress: "",
    password: "",
  };

  const [input, setInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [toLogin, setToLogin] = useState(false);
  const [registerError, setregisterError] = useState("");

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

    if (values.fullName === "") {
      errors.fullName = "Full name is required";
    }

    if (values.emailAddress === "") {
      errors.emailAddress = "URL is required";
    } else if (
      values.emailAddress !== "" &&
      urlRegex.test(values.emailAddress) !== true
    ) {
      errors.emailAddress = "URL is incorrect";
    }

    if (values.password === "") {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = (newUserInfo) => {
    register(newUserInfo).catch(() => {
      setregisterError("Look's like you already have an account");
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setInput(initialValues);
      handleSubmit(input);
    }
  }, [formErrors, isSubmit]);

  if (toLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="registerMainContainer">
      <div className="registerContainer">
        <div className="registerInfoContainer">
          <img src={bookMarkImage} alt="" className="registerHeaderIcon" />
          <h1 className="registerHeading">Create your account</h1>
          <p className="registerPara">
            Join us and start saving your favorite links - organised, searchable
            and always within reach.
          </p>
        </div>

        <div className="registerErrorContainer">
          <span className="registerError">{registerError}</span>
        </div>

        <form onSubmit={onSubmit} className="registerForm">
          <div className="formFieldContainer">
            <div className="formFields">
              <label htmlFor="" className="registerLabel">
                Full Name <span className="registerArticks">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={handleChange}
                maxLength={30}
                className={
                  formErrors.fullName ? "formErrorBorder" : "formInput"
                }
              />
              <p className="formErrorText">{formErrors.fullName}</p>
            </div>
            <div className="formFields">
              <label htmlFor="" className="registerLabel">
                Email address <span className="registerArticks">*</span>
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
              <label htmlFor="" className="registerLabel">
                Password <span className="registerArticks">*</span>
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
              <button type="submit" className="registerSubmit">
                Create account
              </button>
            </div>
            <p className="registerFooterText">
              Already have an account?{" "}
              <span className="registerLogin" onClick={() => setToLogin(true)}>
                Log in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
