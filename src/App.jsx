import React, { useState, useEffect } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/headerSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";

function App() {
  const [toggle, setToggle] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");

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
          setData(myJson.bookmarks);
          setFilteredData(myJson.bookmarks);
        });
    };

    getData();
  }, []);

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
      </div>
    </>
  );
}

export default App;
