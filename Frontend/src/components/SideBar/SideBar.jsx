import React, { useEffect, useState } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import homeIcon from "../../assets/Images/icon-home.svg";
import archiveIcon from "../../assets/Images/icon-archive.svg";
import { tagsArray } from "../../constants";
import "./sideBarStyles.scss";
import closeIcon from "../../assets/Images/icon-close.svg";
import { Link } from "react-router-dom";

function SideBar({
  updateToggle,
  currentToggle,
  bkData,
  handleSelect,
  checkedList,
  handleReset,
  showSidebar,
}) {
  const [tagData, setTagData] = useState(tagsArray);

  useEffect(() => {
    const newTagData = tagsArray.map((tag) => ({
      ...tag,
    }));

    bkData.forEach((item) => {
      if (item?.tags) {
        newTagData.forEach((tag) => {
          if (item.tags.includes(tag.value)) {
            tag.tagNumber++;
          }
        });
      }
    });

    setTagData(newTagData);
  }, [bkData]);

  return (
    <div className="sideBarMainContainer">
      <img
        src={closeIcon}
        alt=""
        onClick={showSidebar}
        className="closeIconSidebar"
      />
      <div className="imageContainerHome">
        <img src={bookMarkImage} alt="homeIcon" className="logo" />
      </div>

      <div className="activate">
        <a
          className={`${
            currentToggle === 1
              ? "homeIconContainerActive"
              : "homeIconContainer"
          }`}
          onClick={() => updateToggle(1)}
        >
          <img src={homeIcon} alt="homeIcon" className="homeIcon" />
          <span className="homeIconText">
            <Link to="/">Home</Link>
          </span>
        </a>
        <a
          className={`${
            currentToggle === 2
              ? "archiveIconContainerActive"
              : "archiveIconContainer"
          }`}
          onClick={() => updateToggle(2)}
        >
          <img src={archiveIcon} alt="archiveIcon" className="archiveIcon" />
          <span className="archiveIconText">
            <Link to="/archive">Archive</Link>
          </span>
        </a>
      </div>

      <div className="tagsNav">
        <div className="tagheaderCon">
          <h3 className="tagsHeader">TAGS</h3>
          {checkedList.length > 0 ? (
            <button className="resetButton" onClick={handleReset}>
              Reset
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="tagsMainContainer">
          <ul className="ulTags">
            {tagData.map((item) => (
              <li key={item.id} className="liTags">
                <input
                  type="checkbox"
                  className="tagsInput"
                  name="tags"
                  id={item.id}
                  value={item.value}
                  onChange={handleSelect}
                  checked={checkedList.includes(item.value)}
                />
                <label htmlFor="" className="tagsLabel">
                  {item.value}
                </label>
                <span className="tagsCount">
                  <p className="tagsCountText">{item.tagNumber}</p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
