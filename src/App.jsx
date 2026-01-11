import React, { useState, useEffect, useRef } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/HeaderSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";
import Modal from "./components/Modal/Modal";
import { getRandomPastDate } from "./constants";
import { setItem, getItem } from "./utils/localStorage";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import PopupModals from "./components/otherPopupModals/PopupModals";
import { ToastContainer, toast } from "react-toastify";

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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const notify = (val) => {
    if (val === "Bookmark Deleted succesfully") {
      toast.error(val);
    } else {
      toast.success(val);
    }
  };

  let menuRef = useRef();
  let sortRef = useRef();

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
      pinned: false,
      isArchived: false,
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

      if (sortRef) {
        if (
          !sortRef?.current?.contains(e?.target) &&
          !e.target.classList.contains("sortText")
        ) {
          setDisplaySort(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef, sortRef]);

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
    onMouseEnterOption(itemId);
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

  const showSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="container">
        {isSidebarVisible && (
          <aside className="grid gridOne" style={{ gridArea: "sidebar" }}>
            <SideBar
              updateToggle={updateToggle}
              handleSelect={handleSelect}
              handleReset={handleReset}
              currentToggle={toggle}
              bkData={data}
              checkedList={checkedList}
              isChecked={checked}
              showSidebar={showSidebar}
            />
          </aside>
        )}
        <header className="grid gridTwo" style={{ gridArea: "header" }}>
          <HeaderSearchBar
            bkData={data}
            input={input}
            handleInput={handleInput}
            openModalPop={openModalPop}
            onMouseEnter={onMouseEnter}
            displayProfile={displayProfile}
            openModal={openModal}
            toggle={toggle}
            showSidebar={showSidebar}
          />
        </header>
        <main className="grid gridThree" style={{ gridArea: "mainPage" }}>
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
            displaySort={displaySort}
            updateSortCount={updateSortCount}
            handleSortReset={handleSortReset}
            sortRef={sortRef}
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
            notify={notify}
          />
        )}

        {displayProfile && <ProfileCard menuRef={menuRef} />}

        <ToastContainer />

        {showActionModal && (
          <PopupModals
            openActionModal={openActionModal}
            header={headerText}
            setAction={setAction}
            notify={notify}
          />
        )}
      </div>
    </>
  );
}

export default App;
