import React, { useEffect, useState } from "react";
import bookMarkImage from "../../assets/Images/logo-light-theme.svg";
import homeIcon from "../../assets/Images/icon-home.svg";
import archiveIcon from "../../assets/Images/icon-archive.svg";
import { tagsArray } from "../../constants";
import "../SideBar/sideBarStyles.scss";

function SideBar({ updateToggle, currentToggle, bkData }) {
  const [tagData, setTagData] = useState(tagsArray);

  useEffect(() => {
    const newTagData = tagsArray.map((tag) => ({
      ...tag,
    }));

    bkData.forEach((item) => {
      if (item?.tags) {
        newTagData.forEach((tag) => {
          if (item.tags.includes(tag.name)) {
            tag.value++;
          }
        });
      }
    });

    setTagData(newTagData);
  }, [bkData]);

  return (
    <div className="sideBarMainContainer">
      <div>
        <img src={bookMarkImage} alt="homeIcon" className="logo" />
      </div>

      <div>
        <a
          className={`${
            currentToggle === 1
              ? "homeIconContainerActive"
              : "homeIconContainer"
          }`}
          onClick={() => updateToggle(1)}
        >
          <img src={homeIcon} alt="homeIcon" className="homeIcon" />
          <span className="homeIconText">Home</span>
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
          <span className="archiveIconText">Archived</span>
        </a>
      </div>

      <div className="tagsNav">
        <h3 className="tagsHeader">TAGS</h3>
        <div className="tagsMainContainer">
          <ul className="ulTags">
            {tagData.map((item) => (
              <li key={item.id} className="liTags">
                <input
                  type="checkbox"
                  className="tagsInput"
                  name="tags"
                  id={item.id}
                />
                <label htmlFor="" className="tagsLabel">
                  {item.name}
                </label>
                <span className="tagsCount">
                  <p className="tagsCountText">{item.value}</p>
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
