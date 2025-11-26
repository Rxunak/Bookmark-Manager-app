import React, { useEffect, useState } from "react";
import "../Bookmark/bookmarkPage.scss";
import sortIcon from "../../../public/Images/icon-sort.svg";
import menuBookmark from "../../../public/Images/icon-menu-bookmark.svg";
import eye from "../../../public/Images/icon-visit-count.svg";
import clock from "../../../public/Images/icon-last-visited.svg";
import calender from "../../../public/Images/icon-created.svg";
import pin from "../../../public/Images/icon-pin.svg";
import gitHub from "../../../public/Images/icon-pin.svg";
import { getDate } from "../../constants";

function BookmarkPage() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState("../../assets/images/favicon-github.png");

  const getData = (url) => {
    fetch("src/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson.bookmarks);
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
        {data.map((item, index) => (
          <div key={index} className={`gridArticles articleCard${index + 1}`}>
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
              <p className="articleBodyText">{item.description}</p>
              <div className="articleBodyTags">
                {item.tags.map((tag) => (
                  <span className="tagOne">{tag}</span>
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
                <span className="footerText">{getDate(item.lastVisited)}</span>
              </span>
              {item.pinned ? (
                <img src={pin} alt="" className="footerPin" />
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkPage;
