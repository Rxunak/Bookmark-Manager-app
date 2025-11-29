import React, { useState } from "react";
import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/headerSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";

function App() {
  const [toggle, setToggle] = useState(1);

  const updateToggle = (id) => {
    setToggle(id);
  };
  return (
    <>
      <div className="container">
        <aside className="grid gridOne">
          <SideBar updateToggle={updateToggle} currentToggle={toggle} />
        </aside>
        <header className="grid gridTwo">
          <HeaderSearchBar />
        </header>
        <main className="grid gridThree">
          <BookmarkPage toggleButton={toggle} />
        </main>
      </div>
    </>
  );
}

export default App;
