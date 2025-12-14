import React, { useState, useEffect } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/HeaderSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";
import Modal from "./components/Modal/Modal";
import { getRandomPastDate } from "./constants";
import { setItem, getItem } from "./utils/localStorage";

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

          console.log(allBookmarks);
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
    console.log(newBookmarkInformation);

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

  useEffect(() => {
    console.log("bok", addBookmark);
  }, [addBookmark]);

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
          />
        </header>
        <main className="grid gridThree">
          <BookmarkPage
            setToggleData={setToggleData}
            toggleButton={toggle}
            bkData={data}
            filterData={filteredData}
            checkedList={checkedList}
            isChecked={checked}
            input={input}
          />
        </main>

        {openModal && (
          <Modal closeModalPop={closeModalPop} handleSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
}

export default App;
