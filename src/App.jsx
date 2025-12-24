import React, { useState, useEffect, useRef } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/HeaderSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";
import Modal from "./components/Modal/Modal";
import { getRandomPastDate } from "./constants";
import { setItem, getItem } from "./utils/localStorage";
import ProfileCard from "./components/ProfileCard/ProfileCard";

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
  const [displayOptions, setDisplayOptions] = useState(false);
  const [currentCardId, setCurrentCardId] = useState("");

  let menuRef = useRef();
  let optionRef = useRef();

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

  const openModalPop = (val) => {
    setOpenModal(val);
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
    if (currentCardId === id) {
      setDisplayOptions(false);
      setCurrentCardId(null);
    } else {
      setCurrentCardId(id);
      setDisplayOptions(true);
    }
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

  useEffect(() => {
    const handler = (e) => {
      if (optionRef) {
        if (
          !optionRef?.current?.contains(e?.target) &&
          !e.target.closest(".articleBookmark")
        ) {
          setDisplayOptions(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [optionRef]);

  useEffect(() => {
    console.log(displayOptions);
  });
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
            toggleButton={toggle}
            bkData={data}
            filterData={filteredData}
            checkedList={checkedList}
            isChecked={checked}
            input={input}
            displayOptions={displayOptions}
            currentCardId={currentCardId}
            optionRef={optionRef}
          />
        </main>

        {openModal && (
          <Modal closeModalPop={closeModalPop} handleSubmit={handleSubmit} />
        )}

        {displayProfile && <ProfileCard menuRef={menuRef} />}
      </div>
    </>
  );
}

export default App;
