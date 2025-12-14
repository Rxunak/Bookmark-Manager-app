import React, { useEffect, useState } from "react";
import "../Modal/modal.scss";
import closeIcon from "../../assets/Images/icon-close.svg";

function Modal({ closeModalPop, handleSubmit }) {
  const [input, setInput] = useState({});

  let length;

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
              <label htmlFor="" className="formLabel">
                Title <span className="articks">*</span>
              </label>
              <input
                type="text"
                className="formInput"
                name="title"
                value={input.title || ""}
                onChange={handleChange}
              />
            </div>

            <div className="formLabelContainer">
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
              </span>
            </div>

            <div className="formLabelContainer">
              <label htmlFor="" className="formLabel">
                Website URL <span className="articks">*</span>
              </label>
              <input
                type="text"
                className="formInput"
                name="url"
                value={input.url || ""}
                onChange={handleChange}
              />
            </div>

            <div className="formLabelContainer">
              <label htmlFor="" className="formLabel">
                Tags <span className="articks">*</span>
              </label>
              <input
                type="text"
                className="formInput"
                placeholder="e.g. Design, Learning, Tools"
                name="tags"
                value={input.tags || ""}
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
