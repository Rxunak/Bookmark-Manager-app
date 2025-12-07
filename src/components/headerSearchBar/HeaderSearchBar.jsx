import React, { useState } from "react";
import "../headerSearchBar/headerSearchBar.scss";
import profileImage from "../../assets/Images/image-avatar.webp";
import addIcon from "../../assets/Images/icon-add.svg";

function HeaderSearchBar({ bkData, handleInput, input }) {
  console.log(input);
  console.log(bkData.filter((item) => item.title === input));
  return (
    <>
      <div className="headerMainContainer">
        <section className="srachBarContainer">
          <input
            type="text"
            placeholder="Search by title..."
            className="searchBar"
            value={input}
            onChange={(e) => handleInput(e.target.value)}
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
