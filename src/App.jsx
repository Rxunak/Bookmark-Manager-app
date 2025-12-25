import React, { useState, useEffect, useRef } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/HeaderSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";
import Modal from "./components/Modal/Modal";
import { getRandomPastDate } from "./constants";
import { setItem, getItem } from "./utils/localStorage";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import SortPopup from "./components/sortPopup/SortPopup";

function App() {
  const [toggle, setToggle] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [addBookmark, setAddBookmark] = useState(() => {
    return getItem("Bookmark") || [];
  });
  const [displayProfile, setDisplayProfile] = useState(false);
  const [openCards, setOpenCardId] = useState([]);
  const [displaySort, setDisplaySort] = useState(false);
  const [sortCount, setSortCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    const getData = () => {
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
          const userBookmarks = getItem("Bookmark") || [];

          const allBookmarks = [...myJson.bookmarks, ...userBookmarks];
          setData(allBookmarks);
          setFilteredData(allBookmarks);
        });
    };

    getData();
  }, [addBookmark]);

  const updateToggle = (id) => {
    setToggle(id);
  };

  const handleReset = () => {
    setCheckedList([]);
  };

  const setToggleData = () => {
    setToggle(0);
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedList([...checkedList, value]);
      setChecked(isChecked);
    } else {
      const filteredItems = checkedList.filter((item) => item !== value);
      setCheckedList(filteredItems);
    }
  };

  const handleInput = (e) => {
    setInput(e);
  };

  const openModalPop = (val, isEdit, id) => {
    setOpenModal(val);
    setIsEdit(isEdit);
    onMouseEnterOption(id);
  };

  const closeModalPop = (val) => {
    setOpenModal(val);
  };

  const handleSubmit = (newBookmarkInformation) => {
    const newBookmark = {
      id: Date.now(),
      favicon: "favicon-flexbox-zombies.png",
      createdAt: new Date().toISOString(),
      lastVisited: getRandomPastDate(),
      ...newBookmarkInformation,
    };

    setAddBookmark((prev) => [...prev, newBookmark]);
  };

  useEffect(() => {
    setItem("Bookmark", addBookmark);
  }, [addBookmark]);

  const onMouseEnter = () => {
    setDisplayProfile(!displayProfile);
  };

  const onMouseEnterOption = (id) => {
    if (openCards.includes(id)) {
      setOpenCardId((prevOpenCards) =>
        prevOpenCards.filter((cardId) => cardId !== id)
      );
    } else {
      setOpenCardId((prevOpenCards) => [...prevOpenCards, id]);
    }
  };

  const onMouseEnterSort = () => {
    console.log(displaySort);
    setDisplaySort(!displaySort);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef) {
        if (
          !menuRef?.current?.contains(e?.target) &&
          !e.target.classList.contains("profileImage")
        ) {
          setDisplayProfile(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  const updateSortCount = (id) => {
    setSortCount(id);
  };

  const handleSortReset = () => {
    setSortCount(0);
  };

  return (
    <>
      <div className="container">
        <aside className="grid gridOne">
          <SideBar
            updateToggle={updateToggle}
            handleSelect={handleSelect}
            handleReset={handleReset}
            currentToggle={toggle}
            bkData={data}
            checkedList={checkedList}
            isChecked={checked}
          />
        </aside>
        <header className="grid gridTwo">
          <HeaderSearchBar
            bkData={data}
            input={input}
            handleInput={handleInput}
            openModalPop={openModalPop}
            onMouseEnter={onMouseEnter}
            displayProfile={displayProfile}
          />
        </header>
        <main className="grid gridThree">
          <BookmarkPage
            setToggleData={setToggleData}
            onMouseEnterOption={onMouseEnterOption}
            onMouseEnterSort={onMouseEnterSort}
            openModalPop={openModalPop}
            toggleButton={toggle}
            bkData={data}
            filterData={filteredData}
            checkedList={checkedList}
            isChecked={checked}
            input={input}
            openCardId={openCards}
            sortCount={sortCount}
          />
        </main>

        {openModal && (
          <Modal
            closeModalPop={closeModalPop}
            handleSubmit={handleSubmit}
            isEdit={isEdit}
          />
        )}

        {displayProfile && <ProfileCard menuRef={menuRef} />}

        {displaySort && (
          <SortPopup
            updateSortCount={updateSortCount}
            handleSortReset={handleSortReset}
            sortCount={sortCount}
          />
        )}
      </div>
    </>
  );
}

export default App;
