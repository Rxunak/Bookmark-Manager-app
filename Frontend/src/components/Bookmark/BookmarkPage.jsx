import React, { useEffect, useState, useRef } from "react";
import "./bookmarkPage.scss";
import sortIcon from "../../assets/Images/icon-sort.svg";
import menuBookmark from "../../assets/Images/icon-menu-bookmark.svg";
import eye from "../../assets/Images/icon-visit-count.svg";
import clock from "../../assets/Images/icon-last-visited.svg";
import calender from "../../assets/Images/icon-created.svg";
import pin from "../../assets/Images/icon-pin.svg";
import { getDate } from "../../constants";
import OptionsPopup from "../optionsPopup/OptionsPopup";
import SortPopup from "../sortPopup/SortPopup";

function BookmarkPage({
  toggleButton,
  bkData,
  filterData,
  checkedList,
  input,
  onMouseEnterOption,
  onMouseEnterSort,
  openCardId,
  optionRef,
  sortCount,
  openModalPop,
  openActionModal,
  displaySort,
  updateSortCount,
  handleSortReset,
  sortRef,
}) {
  const showTagFilter = checkedList.length > 0 && input.length === 0;
  const showSearch = input.length > 0;
  const showTitle = !showSearch;

  const titleText = toggleButton == 1 ? "All Bookmarks" : "Archived Bookmarks";

  const [formFilteredData, setFormFilteredData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [trunctedTag, setTrunctedTag] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    const listenToScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollPosition = container.scrollTop;

        if (scrollPosition > 20) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    const container = containerRef.current;
    if (container && displaySort) {
      container.addEventListener("scroll", listenToScroll);
      return () => container.removeEventListener("scroll", listenToScroll);
    }
  }, [displaySort]);

  useEffect(() => {
    let filteredData = [...bkData];

    if (input.length > 0) {
      filteredData = filteredData.filter((item) =>
        item?.title?.includes(input),
      );
    }

    if (toggleButton === 1) {
      filteredData = filteredData.filter((item) => item.isArchived === false);
    }

    if (toggleButton === 2) {
      filteredData = filteredData.filter((item) => item.isArchived === true);
    }

    if (checkedList.length > 0) {
      filteredData = filteredData.filter((item) =>
        item?.tags?.some((r) => checkedList.includes(r)),
      );
    }

    if (sortCount === 1) {
      filteredData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    if (sortCount === 2) {
      filteredData.sort((a, b) => {
        if (!a.lastVisited && !b.lastVisited) return 0;
        if (!a.lastVisited) return 1;
        if (!b.lastVisited) return -1;
        return b.lastVisited.localeCompare(a.lastVisited);
      });
    }

    if (sortCount === 3) {
      filteredData.sort((a, b) => b.visitCount - a.visitCount);
      console.log("hello");
    }

    setFormFilteredData(filteredData);
  }, [toggleButton, bkData, filterData, checkedList, input, sortCount]);

  return (
    <div className="bookmarkMainContainer" ref={containerRef}>
      <div className="bookmarkHeader ">
        <div className="headCon">
          {showTitle && (
            <span
              className={showTagFilter ? "bookmarkTitleHide" : "bookmarkTitle"}
            >
              {titleText}
            </span>
          )}

          <span className={showTagFilter ? "bookmarkShow" : "bookmarkShowHide"}>
            Bookmarks tagged:{" "}
            <span className="tag-item">
              {checkedList.slice(0, 2) + " + " + checkedList.slice(2).length}
            </span>
          </span>

          <span
            className={showSearch ? "searchInputShow" : "searchInputShowHide"}
          >
            Results for: <span className="inputText">{`"${input}"`}</span>
          </span>
        </div>

        <div className="sortByButtonDiv">
          <button className="sortByButton" onClick={onMouseEnterSort}>
            <img src={sortIcon} alt="sortIcon" className="sortIcon" />
            <span className="sortText">Sort By</span>
          </button>
        </div>

        {displaySort && isVisible && (
          <SortPopup
            updateSortCount={updateSortCount}
            handleSortReset={handleSortReset}
            sortCount={sortCount}
            onMouseEnterSort={onMouseEnterSort}
            sortRef={sortRef}
          />
        )}
      </div>

      <div
        className={
          formFilteredData.length <= 3 ? "articlesTwoCards" : "articles"
        }
      >
        {formFilteredData.map((item, index) => (
          <div key={index} className={`gridArticles articleCard${index + 1}`}>
            <div className="mainArticle">
              <div className="articleHeader">
                <img src={item.favicon} alt="" className="articleHeaderImage" />
                <span>
                  <h1 className="articleHeaderText">{item.title}</h1>
                  <span className="articleHeaderTextSecondary">{item.url}</span>
                </span>

                <button
                  className={
                    openCardId.includes(item.id)
                      ? "articleBookmarkActive"
                      : "articleBookmark"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onMouseEnterOption(item.id);
                  }}
                >
                  <img src={menuBookmark} alt="" />
                </button>
                {openCardId.includes(item.id) && (
                  <OptionsPopup
                    optionRef={optionRef}
                    isArchived={item.isArchived}
                    openModalPop={openModalPop}
                    itemId={item.id}
                    openActionModal={openActionModal}
                    isPinned={item.pinned}
                  />
                )}

                {item.isArchived === true && (
                  <div className="isArchived">Archived</div>
                )}
              </div>

              <div className="articleBody">
                <div className="articleTextBodyScroll">
                  <p className="articleBodyText">{item.description}</p>
                </div>
                <div className="articleBodyTags">
                  {item?.tags?.map((tag, index) => (
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
