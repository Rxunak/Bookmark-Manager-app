import React from "react";
import "../Bookmark/bookmarkPage.scss";
import sortIcon from "../../assets/Images/icon-sort.svg";
import testImage from "../../assets/Images/favicon-claude.png";
import menuBookmark from "../../assets/Images/icon-menu-bookmark.svg";
import eye from "../../assets/Images/icon-visit-count.svg";
import clock from "../../assets/Images/icon-last-visited.svg";
import calender from "../../assets/Images/icon-created.svg";
import pin from "../../assets/Images/icon-pin.svg";

function BookmarkPage() {
  const titles = ["helo", "helo", "helo", "helo"];
  return (
    <div className="bookmarkMainContainer">
      <div className="bookmarkHeader">
        <span className="bookmarkTitle">All bookmarks</span>
        <button className="sortByButton">
          <img src={sortIcon} alt="sortIcon" className="sortIcon" />
          <span className="sortText">Sort By</span>
        </button>
      </div>

      <div className="articles">
        {titles.map((item, index) => (
          <div key={index} className={`gridArticles articleCard${index + 1}`}>
            <div className="articleHeader">
              <img src={testImage} alt="" className="articleHeaderImage" />
              <span>
                <h1 className="articleHeaderText">Frontend Mentor</h1>
                <span className="articleHeaderTextSecondary">
                  frontendmentor.io
                </span>
              </span>

              <button className="articleBookmark">
                <img src={menuBookmark} alt="" />
              </button>
            </div>
            <div className="articleBody">
              <p className="articleBodyText">
                Improve your front-end coding skills by building real projects.
                Solve real world HTML, CSS and JavaScript challenges whilst
                working to professional designs.{" "}
              </p>
              <div className="articleBodyTags">
                <span className="tagOne">Practice</span>
                <span className="tagOne">Learning</span>
                <span className="tagOne">Community</span>
              </div>
            </div>
            <div className="articleFooter">
              <span className="footerIconContainer special">
                <img src={eye} alt="" className="footerIcon" />
                <span className="footerText">47</span>
              </span>
              <span className="footerIconContainer">
                {" "}
                <img src={clock} alt="" className="footerIcon" />
                <span className="footerText">23 Sep</span>
              </span>
              <span className="footerIconContainer">
                {" "}
                <img src={calender} alt="" className="footerIcon" />
                <span className="footerText">15 Jan</span>
              </span>
              <img src={pin} alt="" className="footerPin" />
            </div>
            {/* {item} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkPage;
