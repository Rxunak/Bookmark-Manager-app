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
import PopupModals from "./components/otherPopupModals/PopupModals";

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
  const [isEditIndex, setIsEditIndex] = useState(0);
  const [showActionModal, setShowActionModal] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [actionItemId, setActionItemId] = useState("");

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
    setIsEditIndex(id);
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

  const updateExistingData = (id, input) => {
    const oldData = data.find((bookmark) => bookmark.id === id);
    const newData = { ...oldData, ...input };

    const newArray = data.map((bookmark) =>
      bookmark.id === id ? newData : bookmark
    );
    setData(newArray);

    const userBookmarks = getItem("Bookmark") || [];
    const old = userBookmarks.find((bk) => bk?.id === id);
    const newD = { ...old, ...input };

    const newArrayLocalstorage = userBookmarks.map((bookmark) =>
      bookmark.id === id ? newD : bookmark
    );

    setItem("Bookmark", newArrayLocalstorage);
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

  const openActionModal = (value, headerInfo, itemId) => {
    setShowActionModal(value);
    setHeaderText(headerInfo);
    setActionItemId(itemId);
  };

  const setAction = (buttonText) => {
    const oldInput = data.find((input) => input.id === actionItemId);

    let newInput;

    if (buttonText === "Archive" || buttonText === "Unarchive") {
      newInput = { ...oldInput, isArchived: !oldInput.isArchived };
    }

    if (buttonText === "Pin" || buttonText === "Unpin") {
      newInput = { ...oldInput, pinned: !oldInput.pinned };
    }

    if (buttonText === "Delete") {
      newInput = data.filter((item) => item.id !== actionItemId);
    }

    const newInputArray = data.map((item) =>
      item.id === actionItemId ? newInput : item
    );

    setData(newInputArray);
    openActionModal(false);
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
            openActionModal={openActionModal}
          />
        </main>

        {openModal && (
          <Modal
            closeModalPop={closeModalPop}
            handleSubmit={handleSubmit}
            isEdit={isEdit}
            filterData={data}
            isEditIndex={isEditIndex}
            updateExistingData={updateExistingData}
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

        {showActionModal && (
          <PopupModals
            openActionModal={openActionModal}
            header={headerText}
            setAction={setAction}
          />
        )}
      </div>
    </>
  );
}

export default App;
