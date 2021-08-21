import { useState } from "react";

import Button from "../shared/Button";
import Input from "../shared/Input";

export default function TopBar(Props) {
  const [slide, setSlide] = useState("");

  return (
    <section className="topBar">
      <div className="row between">
        <h3 className="heading">Sticky Note's</h3>
        <Button
          className="primary"
          value="New Note"
          onClick={Props.newNoteButton}
        />
      </div>
      <hr />

      {/* Filter section */}
      <div className="row between filter wrapReverse">
        <div className={`left row around ${slide}`}>
          <div
            className="btn"
            onClick={() => {
              setSlide("");
              Props.setCategory("");
            }}
          >
            Stikcy Notes
          </div>
          <div
            className="btn"
            onClick={() => {
              setSlide("second");
              Props.setCategory("bookmark");
            }}
          >
            Bookmark
          </div>
          <div
            className="btn"
            onClick={() => {
              setSlide("third");
              Props.setCategory("archive");
            }}
          >
            Archive
          </div>
          <div
            className="btn"
            onClick={() => {
              setSlide("four");
              Props.setCategory("trash");
            }}
          >
            Trash
          </div>
          <span></span>
        </div>
        <div className="right">
          <Input
            type="text"
            id="filter"
            title="Filter"
            placeholder="Filter by title ..."
            className="border"
            onChange={(i) =>
              document
                .querySelectorAll(".stickyNote")
                .forEach((e) =>
                  e
                    .querySelector("div")
                    .innerHTML.toLowerCase()
                    .indexOf(i.target.value) === -1
                    ? (e.style.display = "none")
                    : (e.style.display = "block")
                )
            }
          />
        </div>
      </div>
      <hr />
    </section>
  );
}
