import React, { useState } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import "./forgot-password.scss";

function ForgotPassword() {
  const initialValues = {
    emailAddress: "",
  };

  const [input, setInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

    return errors;
  };

  return (
    <div className="forgotPasswordMainContainer">
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordInfoContainer">
          <img src={bookMarkImage} alt="" className="forgotPasswordHeaderIcon" />
          <h1 className="forgotPasswordHeading">Forgot your password?</h1>
          <p className="forgotPasswordPara">
            Enter your email address below and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="forgotPasswordForm">
          <div className="formFieldContainer">
            <div className="formFields">
              <label htmlFor="" className="forgotPasswordLabel">
                Email address <span className="forgotPasswordArticks">*</span>
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
            <div className="formButtonContainer">
              <button type="submit" className="forgotPasswordSubmit">
                Send reset link
              </button>
            </div>
            <p className="forgotPasswordFooterText">
              <span className="forgotPasswordLogin">Back to login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
