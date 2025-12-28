import React, { useEffect, useState } from "react";
import "../otherPopupModals/popupModals.scss";
import closeIcon from "../../assets/Images/icon-close.svg";

function PopupModals({ openActionModal, header, setAction, notify }) {
  const actionText = header?.slice(0, header?.indexOf(" "));

  const [isDelete, setIsDelete] = useState(false);
  const [actionButtonText, setActionButtonText] = useState(actionText);

  useEffect(() => {
    if (actionText === "Delete") {
      setIsDelete(true);
    }
  });

  return (
    <div className="modalMainContainer">
      <div className="modalMainPage">
        <div className="actionModalInfo">
          <h1 className="actionModalInfoHeader">{header}</h1>
          <span className="actionModalInfoText">
            Are you sure you want to archive this bookmark?
          </span>
        </div>
        <div className="actionModalButton">
          <button
            className="actionCancelButton"
            onClick={() => openActionModal(false)}
          >
            Cancel
          </button>
          <button
            className={isDelete ? "actionButtonDelete" : "actionButton"}
            onClick={() => {
              setAction(actionButtonText);
              notify(
                (() => {
                  switch (actionButtonText) {
                    case "Archive":
                      return "Bookmark archived succesfully";
                      break;
                    case "Unarchive":
                      return "Bookmark unarchived succesfully";
                      break;
                    case "Pin":
                      return "Bookmark pinned succesfully";
                      break;
                    case "Unpin":
                      return "Bookmark unpinned succesfully";
                      break;
                    case "Delete":
                      return "Bookmark Deleted succesfully";
                      break;
                    default:
                      break;
                  }
                })()
              );
            }}
          >
            {isDelete ? actionButtonText + " Permanently" : actionButtonText}
          </button>
        </div>
        <div
          className="closeIconImageAction"
          onClick={() => openActionModal(false)}
        >
          <img src={closeIcon} alt="close" className="closeImageAction" />
        </div>
      </div>
    </div>
  );
}

export default PopupModals;
