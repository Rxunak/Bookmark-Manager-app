import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";
import HeaderSearchBar from "./components/headerSearchBar/headerSearchBar";
import BookmarkPage from "./components/Bookmark/BookmarkPage";

function App() {
  return (
    <>
      <div className="container">
        <aside className="grid gridOne">
          <SideBar />
        </aside>
        <header className="grid gridTwo">
          <HeaderSearchBar />
        </header>
        <main className="grid gridThree">
          <BookmarkPage />
        </main>
      </div>
    </>
  );
}

export default App;
