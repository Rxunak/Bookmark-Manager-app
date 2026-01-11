import React, { useState } from "react";
import "../headerSearchBar/headerSearchBar.scss";
import profileImage from "../../assets/Images/image-avatar.webp";
import addIcon from "../../assets/Images/icon-add.svg";
import hamburgIcon from "../../assets/Images/icon-menu-hamburger.svg";

function HeaderSearchBar({
  handleInput,
  input,
  openModalPop,
  onMouseEnter,
  displayProfile,
  openModal,
  toggle,
  showSidebar,
}) {
  return (
    <>
      <div className="headerMainContainer">
        <div className="headerHamburgerContainer">
          <button onClick={showSidebar} className="hamburgerButton">
            <img src={hamburgIcon} alt="" className="hamburgerImage" />
          </button>

          <div className="srachBarContainer">
            <input
              type="text"
              placeholder={
                toggle === 1 ? "Search in Home" : "Search in Archive"
              }
              className="searchBar"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
            />
          </div>
        </div>

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
