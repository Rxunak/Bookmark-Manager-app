import React, { useEffect, useState } from "react";
import "../sortPopup/sortPopup.scss";
import check from "../../assets/Images/icon-check.svg";

function SortPopup({ sortCount, updateSortCount, handleSortReset }) {
  console.log(sortCount);

  const [enableButton, setAnableButton] = useState(true);

  useEffect(() => {
    if (sortCount > 0) {
      setAnableButton(false);
    } else {
      setAnableButton(true);
    }
  }, [sortCount]);

  return (
    <div className="sortMainContainer">
      <div className="sortInfo">
        <span className="sortInfoContainer">
          <p className="sortInfoText" onClick={() => updateSortCount(1)}>
            Recently added
          </p>

          {sortCount === 1 ? <img src={check} alt="" /> : " "}
        </span>
        <span className="sortInfoContainer">
          <p className="sortInfoText" onClick={() => updateSortCount(2)}>
            Recently visited
          </p>
          {sortCount === 2 ? <img src={check} alt="" /> : " "}
        </span>
        <span className="sortInfoContainer">
          <p className="sortInfoText" onClick={() => updateSortCount(3)}>
            Most visited
          </p>
          {sortCount === 3 ? <img src={check} alt="" /> : " "}
        </span>
      </div>

      <div className="sortResetButton">
        <button
          className={
            enableButton === false
              ? "sortInfoContainerButtonActive"
              : "sortInfoContainerButton"
          }
          onClick={handleSortReset}
          disabled={enableButton}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default SortPopup;
