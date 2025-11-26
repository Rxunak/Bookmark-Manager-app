import React from "react";
import "../headerSearchBar/headerSearchBar.scss";
import profileImage from "../../../public/Images/image-avatar.webp";
import addIcon from "../../../public/Images/icon-add.svg";

function HeaderSearchBar() {
  return (
    <>
      <div className="headerMainContainer">
        <section className="srachBarContainer">
          <input
            type="text"
            placeholder="Search by title..."
            className="searchBar"
          />
        </section>
        <div className="profileContainer">
          <section className="addBookmark">
            <button className="bookmarkButton">
              <img src={addIcon} alt="" className="addIcon" /> Add Bookmark
            </button>
          </section>
          <section className="profile">
            <img
              src={profileImage}
              alt="profileImage"
              className="profileImage"
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default HeaderSearchBar;
