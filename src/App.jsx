import React, { useState, useEffect } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/headerSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";

function App() {
  const [toggle, setToggle] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  console.log(data);
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
  return (
    <>
      <div className="container">
        <aside className="grid gridOne">
          <SideBar
            updateToggle={updateToggle}
            currentToggle={toggle}
            bkData={data}
          />
        </aside>
        <header className="grid gridTwo">
          <HeaderSearchBar />
        </header>
        <main className="grid gridThree">
          <BookmarkPage
            toggleButton={toggle}
            bkData={data}
            filterData={filteredData}
          />
        </main>
      </div>
    </>
  );
}

export default App;
