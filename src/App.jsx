import "././styles/styles.scss";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <>
      <div className="container">
        <aside className="grid gridOne">
          <SideBar />
        </aside>
        <header className="grid gridTwo"></header>
        <main className="grid gridThree"></main>
      </div>
    </>
  );
}

export default App;
