import React, { useState } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import "../RegisterPage/register.scss";

function Register() {
  const initialValues = {
    fullName: "",
    emailAddress: "",
    password: "",
  };

  const [input, setInput] = useState(initialValues);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((values) => ({ ...values, [name]: value }));
  };
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

        <form className="registerForm">
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
                className="formInput"
              />
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
                className="formInput"
              />
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
                className="formInput"
              />
            </div>
            <div className="formButtonContainer">
              <button type="submit" className="registerSubmit">
                Create account
              </button>
            </div>
            <p className="registerFooterText">
              Already have an account?{" "}
              <span className="registerLogin">Log in</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
