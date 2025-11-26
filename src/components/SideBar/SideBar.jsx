import React from "react";
import bookMarkImage from "../../../public/Images/logo-light-theme.svg";
import homeIcon from "../../../public/Images/icon-home.svg";
import archiveIcon from "../../../public/Images/icon-archive.svg";
import { tagsArray } from "../../constants";
import "../SideBar/sideBarStyles.scss";

function SideBar() {
  return (
    <div className="sideBarMainContainer">
      <div>
        <img src={bookMarkImage} alt="homeIcon" className="logo" />
      </div>

      <div>
        <a className="homeIconContainer">
          <img src={homeIcon} alt="homeIcon" className="homeIcon" />
          <span className="homeIconText">Home</span>
        </a>
        <a className="archiveIconContainer">
          <img src={archiveIcon} alt="archiveIcon" className="archiveIcon" />
          <span className="archiveIconText">Archived</span>
        </a>
      </div>

      <div className="tagsNav">
        <h3 className="tagsHeader">TAGS</h3>
        <div className="tagsMainContainer">
          <ul className="ulTags">
            {tagsArray.map((item, index) => (
              <li key={index} className="liTags">
                <input type="checkbox" className="tagsInput" name="tags" />
                <label htmlFor="" className="tagsLabel">
                  {item}
                </label>
                <span className="tagsCount">
                  <p className="tagsCountText">6</p>
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
