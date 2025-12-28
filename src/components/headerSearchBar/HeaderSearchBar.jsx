import React, { useState } from "react";
import "../headerSearchBar/headerSearchBar.scss";
import profileImage from "../../assets/Images/image-avatar.webp";
import addIcon from "../../assets/Images/icon-add.svg";

function HeaderSearchBar({
  handleInput,
  input,
  openModalPop,
  onMouseEnter,
  displayProfile,
  openModal,
  toggle,
}) {
  return (
    <>
      <div className="headerMainContainer">
        <section className="srachBarContainer">
          <input
            type="text"
            placeholder={toggle === 1 ? "Search in Home" : "Search in Archive"}
            className="searchBar"
            value={input}
            onChange={(e) => handleInput(e.target.value)}
          />
        </section>
        <div className="profileContainer">
          <section className={openModal ? "addBookmarkActive" : "addBookmark"}>
            <button
              className="bookmarkButton"
              onClick={() => openModalPop(true, false)}
            >
              <img src={addIcon} alt="" className="addIcon" /> Add Bookmark
            </button>
          </section>
          <section
            className={`${displayProfile ? "profileBorder" : "profile"}`}
          >
            <img
              src={profileImage}
              alt="profileImage"
              className="profileImage"
              onClick={onMouseEnter}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default HeaderSearchBar;
