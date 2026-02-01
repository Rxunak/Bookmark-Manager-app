import React, { useState } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import "./reset-password.scss";

function ResetPassword() {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
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

    if (values.newPassword === "") {
      errors.newPassword = "New password is required";
    }

    if (values.confirmPassword === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="resetPasswordMainContainer">
      <div className="resetPasswordContainer">
        <div className="resetPasswordInfoContainer">
          <img src={bookMarkImage} alt="" className="resetPasswordHeaderIcon" />
          <h1 className="resetPasswordHeading">Reset your password</h1>
          <p className="resetPasswordPara">
            Enter your new password below. Make sure it&apos;s strong and secure.
          </p>
        </div>

        <form onSubmit={onSubmit} className="resetPasswordForm">
          <div className="formFieldContainer">
            <div className="formFields">
              <label htmlFor="" className="resetPasswordLabel">
                New password <span className="resetPasswordArticks">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={input.newPassword}
                onChange={handleChange}
                maxLength={30}
                className={
                  formErrors.newPassword ? "formErrorBorder" : "formInput"
                }
              />
              <p className="formErrorText">{formErrors.newPassword}</p>
            </div>
            <div className="formFields">
              <label htmlFor="" className="resetPasswordLabel">
                Confirm password <span className="resetPasswordArticks">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={handleChange}
                maxLength={30}
                className={
                  formErrors.confirmPassword ? "formErrorBorder" : "formInput"
                }
              />
              <p className="formErrorText">{formErrors.confirmPassword}</p>
            </div>
            <div className="formButtonContainer">
              <button type="submit" className="resetPasswordSubmit">
                Reset password
              </button>
            </div>
            <p className="resetPasswordFooterText">
              <span className="resetPasswordLogin">Back to login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
