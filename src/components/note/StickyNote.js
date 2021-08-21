import { useState, useEffect } from "react";

export default function StickyNote(Props) {
  const [edit, setEdit] = useState(false);
  const [theme, setTheme] = useState();
  const [color, setColor] = useState(false);

  useEffect(
    () => setTheme(Props.themes[Props.note.layout.theme]),
    [Props.themes, Props.note.layout.theme]
  );

  return (
    <fieldset
      id={Props.note.id}
      className="stickyNote"
      style={{ backgroundColor: `var(--${theme})` }}
    >
      {/* Title */}
      <div
        contentEditable={edit}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: Props.note.title }}
        onBlur={(e) => Props.update({ title: e.target.innerHTML })}
      ></div>

      {/* Desc */}
      <div
        contentEditable={edit}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: Props.note.desc }}
        onBlur={(e) => Props.update({ desc: e.target.innerHTML })}
      ></div>

      <div className="option row around">
        <button
          className="btn"
          onClick={() => {
            Props.update({ trash: true });
            Props.update({ bookmark: false });
            Props.update({ archive: false });
            Props.note.layout.trash
              ? Props.delete()
              : Props.update({ trash: true });
          }}
          title={Props.note.layout.trash ? "Delete forever" : "Delete"}
        >
          <i
            className={`${Props.note.layout.trash ? "fas" : "far"} fa-trash`}
          ></i>
          &nbsp; {Props.note.layout.trash ? "Delete forever" : ""}
        </button>

        {Props.note.layout.trash ? (
          <button
            className="btn"
            title="Restore"
            onClick={() => Props.update({ trash: false })}
          >
            <i className="fas fa-trash-restore"></i>
            &nbsp; Restore
          </button>
        ) : (
          <>
            <button
              className="btn"
              title={`${Props.note.layout.archive ? "Unarchive" : "Archive"}`}
              onClick={() => {
                Props.update({
                  archive: Props.note.layout.archive ? false : true,
                });
                Props.update({ bookmark: false });
              }}
            >
              <i
                className={`${
                  Props.note.layout.archive ? "fas" : "far"
                } fa-archive`}
              ></i>
            </button>
            <button
              className="btn"
              title={`${
                Props.note.layout.lock ? "Remove bookmark" : "Bookmark"
              }`}
              onClick={() => {
                Props.update({
                  bookmark: Props.note.layout.bookmark ? false : true,
                });
                Props.update({ archive: false });
              }}
            >
              <i
                className={`${
                  Props.note.layout.bookmark ? "fas" : "far"
                } fa-bookmark`}
              ></i>
            </button>
            <button className="btn" title="Share">
              <i className="far fa-share"></i>
            </button>
            <button
              className={`btn drop ${color ? "active" : ""}`}
              title="Color"
              onClick={() => setColor(color ? false : true)}
            >
              <i className={`${color ? "fas" : "far"} fa-tint`}></i>
              <div className="down">
                {Object.entries(Props.themes).map((e, i) => (
                  <span
                    key={i}
                    title={e[0]}
                    onClick={() => {
                      setTheme(e[1]);
                      Props.update({ theme: e[0] });
                    }}
                    style={{ backgroundColor: `var(--${e[1]})` }}
                  ></span>
                ))}
              </div>
            </button>
            <button
              className="btn"
              title={edit ? "Close" : "Edit"}
              onClick={() => setEdit(edit ? false : true)}
            >
              <i className={`${edit ? "fas" : "far"} fa-pen-nib`}></i>
            </button>
          </>
        )}
      </div>
      <p className="text-center dateTime">{Props.note.dateTime}</p>
    </fieldset>
  );
}
