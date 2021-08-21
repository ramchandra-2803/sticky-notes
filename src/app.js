import { useState, useEffect } from "react";

import "./assets/css/min.css";

// Component's
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import TopBar from "./components/layout/TopBar";
import StickyNote from "./components/note/StickyNote";
import Crud from "./components/note/Crud";
import Themes from "./components/note/Themes";

// Export
export default function App() {
  const [awesome, setAwesome] = useState(Crud({ option: "read" }));
  const [appearnace, setAppearnace] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [category, setCategory] = useState("");

  useEffect(() =>
    appearnace
      ? document.querySelector("body").classList.add("dark")
      : document.querySelector("body").classList.remove("dark")
  );

  const reFresNotes = () => {
    setAwesome(Crud({ option: "read" }));
  };

  const bookmark = awesome.some((e) => e.layout.bookmark === true);
  const archive = awesome.some((e) => e.layout.archive === true);
  const trash = awesome.some((e) => e.layout.trash === true);
  const other = awesome.some(
    (e) =>
      e.layout.trash !== true &&
      e.layout.archive !== true &&
      e.layout.bookmark !== true
  );

  const note = (e, i) => {
    return (
      <StickyNote
        key={i}
        themes={Themes(appearnace)}
        note={e}
        // Function's

        update={(query) => {
          Crud({ option: "update", update: { key: i, query } });
          reFresNotes();
        }}
        delete={() => {
          Crud({ option: "delete", key: i });
          reFresNotes();
        }}
      />
    );
  };
  // Return
  return (
    <>
      <NavBar
        mode={() => {
          setAppearnace(appearnace ? false : true);
          reFresNotes();
        }}
        appearnace={appearnace}
      />
      <br />
      <main role="main" className="container">
        <TopBar
          newNoteButton={() => {
            Crud({ option: "new" });
            reFresNotes();
          }}
          setCategory={(e) => setCategory(e)}
        />

        <section className="stickyNoteContainer">
          {awesome.map((e, i) =>
            category === "" &&
            !e.layout.bookmark &&
            !e.layout.archive &&
            !e.layout.trash
              ? note(e, i)
              : category === "bookmark" && e.layout.bookmark
              ? note(e, i)
              : category === "archive" && e.layout.archive
              ? note(e, i)
              : category === "trash" && e.layout.trash
              ? note(e, i)
              : null
          )}

          {category === "" && !other ? (
            <div className="row column" style={{ margin: "10vh auto" }}>
              <i
                className="fas fa-sticky-note"
                style={{ fontSize: "100px" }}
              ></i>
              <br />
              <p className="text-center">
                Tap the new note button above to create a note
              </p>
            </div>
          ) : null}

          {category === "bookmark" && !bookmark ? (
            <div className="row column" style={{ margin: "10vh auto" }}>
              <i className="fas fa-bookmark" style={{ fontSize: "100px" }}></i>
              <br />
              <p className="text-center">Your bookmark notes appear here</p>
            </div>
          ) : null}
          {category === "archive" && !archive ? (
            <div className="row column" style={{ margin: "10vh auto" }}>
              <i className="fas fa-archive" style={{ fontSize: "100px" }}></i>
              <br />
              <p className="text-center">Your archived notes appear here</p>
            </div>
          ) : null}
          {category === "trash" && !trash ? (
            <div className="row column" style={{ margin: "10vh auto" }}>
              <i className="fas fa-trash" style={{ fontSize: "100px" }}></i>
              <br />
              <p className="text-center">No notes in Trash</p>
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
