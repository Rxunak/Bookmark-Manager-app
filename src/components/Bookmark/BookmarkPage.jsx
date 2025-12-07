import React, { use, useEffect, useState } from "react";
import "../Bookmark/bookmarkPage.scss";
import sortIcon from "../../assets/Images/icon-sort.svg";
import menuBookmark from "../../assets/Images/icon-menu-bookmark.svg";
import eye from "../../assets/Images/icon-visit-count.svg";
import clock from "../../assets/Images/icon-last-visited.svg";
import calender from "../../assets/Images/icon-created.svg";
import pin from "../../assets/Images/icon-pin.svg";
import { getDate } from "../../constants";

function BookmarkPage({ toggleButton, bkData, filterData, checkedList }) {
  const [formFilteredData, setFormFilteredData] = useState([]);

  useEffect(() => {
    let filteredData = bkData;

    if (toggleButton === 2) {
      filteredData = filteredData.filter((item) => item.isArchived === true);
    }

    if (checkedList.length > 0) {
      toggleButton = 0;
      filteredData = filteredData.filter((item) =>
        item.tags.some((r) => checkedList.includes(r))
      );
    }

    setFormFilteredData(filteredData);
  }, [toggleButton, bkData, filterData, checkedList]);

  return (
    <div className="bookmarkMainContainer">
      <div className="bookmarkHeader ">
        {toggleButton > 0 ? (
          <span className="bookmarkTitle">
            {toggleButton === 1 || toggleButton === "1"
              ? "All Bookmarks"
              : "Archived Bookmarks"}

            {checkedList.length > 0 ? "Hello" : ""}
          </span>
        ) : (
          ""
        )}

        <button className="sortByButton">
          <img src={sortIcon} alt="sortIcon" className="sortIcon" />
          <span className="sortText">Sort By</span>
        </button>
      </div>

      <div className="articles">
        {formFilteredData.map((item, index) => (
          <div key={index} className={`gridArticles articleCard${index + 1}`}>
            <div className="mainArticle">
              <div className="articleHeader">
                <img
                  src={`/Images/${item.favicon}`}
                  alt=""
                  className="articleHeaderImage"
                />
                <span>
                  <h1 className="articleHeaderText">{item.title}</h1>
                  <span className="articleHeaderTextSecondary">{item.url}</span>
                </span>

                <button className="articleBookmark">
                  <img src={menuBookmark} alt="" />
                </button>
              </div>
              <div className="articleBody">
                <div className="articleTextBodyScroll">
                  <p className="articleBodyText">{item.description}</p>
                </div>
                <div className="articleBodyTags">
                  {item.tags.map((tag, index) => (
                    <span className="tagOne" key={index}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="articleFooter">
                <span className="footerIconContainer special">
                  <img src={eye} alt="" className="footerIcon" />
                  <span className="footerText">{item.visitCount}</span>
                </span>
                <span className="footerIconContainer">
                  {" "}
                  <img src={clock} alt="" className="footerIcon" />
                  <span className="footerText">{getDate(item.createdAt)}</span>
                </span>
                <span className="footerIconContainer">
                  {" "}
                  <img src={calender} alt="" className="footerIcon" />
                  <span className="footerText">
                    {getDate(item.lastVisited)}
                  </span>
                </span>
                {item.pinned ? (
                  <img src={pin} alt="" className="footerPin" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkPage;
