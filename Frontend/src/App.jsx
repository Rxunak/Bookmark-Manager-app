import React, { useState, useEffect, useRef } from "react";
import "./styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/HeaderSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";
import Modal from "./components/Modal/Modal";
import PopupModals from "./components/otherPopupModals/PopupModals";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import ForgotPassword from "./components/FogotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { clearToken, getToken } from "./api/client";
import { verifyToken } from "./api/authApi";
import {
  createBookmark,
  deleteBookmark,
  fetchBookmarks,
  pinBookmark,
  updateBookmark,
} from "./api/bookmarkApi";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
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

  const validateSession = async () => {
    if (!getToken()) {
      navigate("/login");
      return false;
    }

    try {
      await verifyToken();
      return true;
    } catch (error) {
      if (error?.status === 401) {
        clearToken();
      }
      navigate("/login");
      return false;
    }
  };

  const getData = async () => {
    const bookmarks = await fetchBookmarks();
    setData(bookmarks);
    setFilteredData(bookmarks);
  };

  useEffect(() => {
    const init = async () => {
      const ok = await validateSession();
      if (ok) {
        await getData();
      }
    };

    init();
  }, [location.pathname]);

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
    createBookmark(newBookmarkInformation).then(() => getData());
  };

  const updateExistingData = (id, input) => {
    const oldData = data.find((bookmark) => bookmark.id === id);
    const newData = { ...oldData, ...input };

    updateBookmark(id, newData).then(() => getData());
  };

  const onMouseEnter = () => {
    setDisplayProfile(!displayProfile);
  };

  const onMouseEnterOption = (id) => {
    if (openCards.includes(id)) {
      setOpenCardId((prevOpenCards) =>
        prevOpenCards.filter((cardId) => cardId !== id),
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

      updateBookmark(actionItemId, newInput).then(() => getData());
    }

    if (buttonText === "Pin" || buttonText === "Unpin") {
      newInput = { ...oldInput, pinned: !oldInput.pinned };

      pinBookmark(actionItemId, newInput).then(() => getData());
    }

    if (buttonText === "Delete") {
      newInput = data.filter((item) => item.id !== actionItemId);

      deleteBookmark(actionItemId).then(() => getData());
    }

    const newInputArray = data.map((item) =>
      item.id === actionItemId ? newInput : item,
    );

    setData(newInputArray);
    openActionModal(false);
  };

  const showSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const bookmarkProps = {
    setToggleData,
    onMouseEnterOption,
    onMouseEnterSort,
    openModalPop,
    toggleButton: toggle,
    bkData: data,
    filterData: filteredData,
    checkedList,
    isChecked: checked,
    input,
    openCardId: openCards,
    sortCount,
    openActionModal,
    displaySort,
    updateSortCount,
    handleSortReset,
    sortRef,
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPass" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route
          path="/*"
          element={
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
                  menuRef={menuRef}
                />
              </header>
              <main className="grid gridThree" style={{ gridArea: "mainPage" }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <BookmarkPage {...bookmarkProps} toggleButton={1} />
                    }
                  ></Route>

                  <Route
                    path="/archive"
                    element={
                      <BookmarkPage {...bookmarkProps} toggleButton={2} />
                    }
                  ></Route>
                  <Route></Route>
                </Routes>
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

              {/* {displayProfile && <ProfileCard menuRef={menuRef} />} */}

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
          }
        />
      </Routes>
    </>
  );
}

export default App;
