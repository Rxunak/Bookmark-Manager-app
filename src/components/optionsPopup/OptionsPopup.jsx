import React from "react";
import visit from "../../assets/Images/icon-visit.svg";
import copyURL from "../../assets/Images/icon-copy.svg";
import unpin from "../../assets/Images/icon-unpin.svg";
import edit from "../../assets/Images/icon-edit.svg";
import archive from "../../assets/Images/icon-archive.svg";
import "../optionsPopup/optionPopup.scss";

function OptionsPopup({ optionRef }) {
  return (
    <div className="optionPopupMainContainer" ref={optionRef}>
      <span className="optionContents">
        <img src={visit} alt="" />
        <p className="optionContentsText">Visit</p>
      </span>
      <span className="optionContents">
        <img src={copyURL} alt="" />
        <p className="optionContentsText">Copy URL</p>
      </span>
      <span className="optionContents">
        <img src={unpin} alt="" />
        <p className="optionContentsText">Unpin</p>
      </span>
      <span className="optionContents">
        <img src={edit} alt="" />
        <p className="optionContentsText">Edit</p>
      </span>
      <span className="optionContents">
        <img src={archive} alt="" />
        <p className="optionContentsText">Archive</p>
      </span>
    </div>
  );
}

export default OptionsPopup;
