import React, { useEffect, useState } from "react";
import "../Modal/modal.scss";
import closeIcon from "../../assets/Images/icon-close.svg";

function Modal({ closeModalPop, handleSubmit }) {
<<<<<<< HEAD
  const initialValues = {
    title: "",
    description: "",
    url: "",
    tags: [],
    tag: "",
  };
  const [input, setInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [textareaLength, setTextareaLength] = useState(0);
=======
  const [input, setInput] = useState({});

  let length;
>>>>>>> 18646c44e29c8bacc6284c7e48804b41824dcd2b

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setInput((values) => ({ ...values, tags: tagsArray }));
    } else {
      setInput((values) => ({ ...values, [name]: value }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setFormErrors(validateForm(input));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (input) {
      setTextareaLength(input?.description?.length);
    }
  }, [input, textareaLength]);

  const validateForm = (values) => {
    const errors = {};

    const urlRegex =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if (values.title === "") {
      errors.title = "Title is required";
    }
    if (values.description === "") {
      errors.description = "Description is required";
    }
    if (values.url === "") {
      errors.url = "URL is required";
    } else if (values.url !== "" && urlRegex.test(values.url) !== true) {
      errors.url = "URL is incorrect";
    }
    if (values.tags.length === 0) {
      errors.tag = "Tags are required";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleSubmit(input);
      setInput(initialValues);
      closeModalPop(false);
      setIsSubmit(false);
    }
  }, [formErrors, isSubmit]);
=======

    handleSubmit(input);

    input.title = "";
    input.description = "";
    input.url = "";
    input.tags = "";

    closeModalPop(false);
  };

  if (input) {
    length = input?.description?.length;
  }

  console.log(length);
>>>>>>> 18646c44e29c8bacc6284c7e48804b41824dcd2b

  return (
    <div className="modal">
      <div className="mainModal">
        <div className="formHeader">
          <h1 className="formTitle">Add a bookmark</h1>
          <span className="formInfo">
            Save a link with details to keep your collection organised. We
            extract the favicon automatically from the URL.{" "}
          </span>
        </div>

        <div className="closeIconImage" onClick={() => closeModalPop(false)}>
          <img src={closeIcon} alt="close" className="closeImage" />
        </div>

        <div className="formContainer">
          <form onSubmit={onSubmit} className="modalForm">
            <div className="formLabelContainer">
<<<<<<< HEAD
              <div className="errorHandler">
                <label htmlFor="" className="formLabel">
                  Title <span className="articks">*</span>
                </label>
                <p className="formErrorText">{formErrors.title}</p>
              </div>

              <input
                type="text"
                className={formErrors.title ? "formErrorInput" : "formInput"}
                name="title"
                value={input.title}
                onChange={handleChange}
                maxLength={30}
=======
              <label htmlFor="" className="formLabel">
                Title <span className="articks">*</span>
              </label>
              <input
                type="text"
                className="formInput"
                name="title"
                value={input.title || ""}
                onChange={handleChange}
>>>>>>> 18646c44e29c8bacc6284c7e48804b41824dcd2b
              />
            </div>

            <div className="formLabelContainer">
<<<<<<< HEAD
              <div className="errorHandler">
                <label htmlFor="" className="formLabel">
                  Description <span className="articks">*</span>
                </label>
                <p className="formErrorText">
                  {textareaLength === 280
                    ? "Exceeded word limit"
                    : formErrors.description}
                </p>
              </div>

              <textarea
                type="text"
                className={
                  textareaLength === 280 || formErrors.description
                    ? "formErrorInput"
                    : "formInput"
                }
                id="textarea"
                name="description"
                value={input.description}
                onChange={handleChange}
                minLength={1}
                maxLength={280}
              />
              <span className="wordCount">
                {length !== undefined ? `${textareaLength} / 280` : "0 / 280"}
=======
              <label htmlFor="" className="formLabel">
                Description <span className="articks">*</span>
              </label>
              <textarea
                type="text"
                className="formInput textarea"
                name="description"
                value={input.description || ""}
                onChange={handleChange}
              />
              <span className="wordCount">
                {length !== undefined ? `${length} / 280` : "0 / 280"}
>>>>>>> 18646c44e29c8bacc6284c7e48804b41824dcd2b
              </span>
            </div>

            <div className="formLabelContainer">
<<<<<<< HEAD
              <div className="errorHandler">
                <label htmlFor="" className="formLabel">
                  Website URL <span className="articks">*</span>
                </label>
                <p className="formErrorText">{formErrors.url}</p>
              </div>

              <input
                type="text"
                className={formErrors.url ? "formErrorInput" : "formInput"}
                name="url"
                value={input.url}
=======
              <label htmlFor="" className="formLabel">
                Website URL <span className="articks">*</span>
              </label>
              <input
                type="text"
                className="formInput"
                name="url"
                value={input.url || ""}
>>>>>>> 18646c44e29c8bacc6284c7e48804b41824dcd2b
                onChange={handleChange}
              />
            </div>

            <div className="formLabelContainer">
<<<<<<< HEAD
              <div className="errorHandler">
                <label htmlFor="" className="formLabel">
                  Tags <span className="articks">*</span>
                </label>
                <p className="formErrorText">{formErrors.tag}</p>
              </div>

              <input
                type="text"
                className={formErrors.tag ? "formErrorInput" : "formInput"}
                placeholder="e.g. Design, Learning, Tools"
                name="tags"
                value={input.tags}
=======
              <label htmlFor="" className="formLabel">
                Tags <span className="articks">*</span>
              </label>
              <input
                type="text"
                className="formInput"
                placeholder="e.g. Design, Learning, Tools"
                name="tags"
                value={input.tags || ""}
>>>>>>> 18646c44e29c8bacc6284c7e48804b41824dcd2b
                onChange={handleChange}
              />
            </div>

            <div className="formControls">
              <button
                className="cancelButton"
                onClick={() => closeModalPop(false)}
              >
                Cancel
              </button>
              <button type="submit" className="formAddBookmark">
                Add Bookmark
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
