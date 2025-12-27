import React from "react";
import visit from "../../assets/Images/icon-visit.svg";
import copyURL from "../../assets/Images/icon-copy.svg";
import unpin from "../../assets/Images/icon-unpin.svg";
import edit from "../../assets/Images/icon-edit.svg";
import archive from "../../assets/Images/icon-archive.svg";
import unarchive from "../../assets/Images/icon-unarchive.svg";
import "../optionsPopup/optionPopup.scss";

function OptionsPopup({
  isArchived,
  openModalPop,
  itemId,
  openActionModal,
  isPinned,
}) {
  return (
    <div className={isArchived ? "opActive" : "optionPopupMainContainer"}>
      <span className="optionContents">
        <img src={visit} alt="" />
        <p className="optionContentsText">Visit</p>
      </span>
      <span className="optionContents">
        <img src={copyURL} alt="" />
        <p className="optionContentsText">Copy URL</p>
      </span>

      {isArchived ? (
        <span className="optionContents">
          <img src={unarchive} alt="" />
          <p
            className="optionContentsText"
            onClick={() => openActionModal(true, "Unarchive bookmark", itemId)}
          >
            Unarchive
          </p>
        </span>
      ) : (
        <span className="optionContents">
          <img src={unpin} alt="" />
          <p
            className="optionContentsText"
            onClick={() =>
              openActionModal(
                true,
                `${isPinned ? "Unpin bookmark" : "Pin bookmark"}`,
                itemId
              )
            }
          >
            {isPinned ? "Unpin" : "Pin"}
          </p>
        </span>
      )}

      {isArchived ? (
        <span className="optionContents">
          <img src={edit} alt="" />
          <p
            className="optionContentsText"
            onClick={() => openActionModal(true, "Delete bookmark", itemId)}
          >
            Delete Permanently
          </p>
        </span>
      ) : (
        <span className="optionContents">
          <img src={edit} alt="" />
          <p
            className="optionContentsText"
            onClick={() => openModalPop(true, true, itemId)}
          >
            Edit
          </p>
        </span>
      )}

      {isArchived ? (
        ""
      ) : (
        <span className="optionContents">
          <img src={archive} alt="" />
          <p
            className="optionContentsText"
            onClick={() => openActionModal(true, "Archive bookmark", itemId)}
          >
            Archive
          </p>
        </span>
      )}
    </div>
  );
}

export default OptionsPopup;
