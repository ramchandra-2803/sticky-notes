import Themes from "./Themes";

export default function Crud(Props) {
  const awesome = JSON.parse(localStorage.getItem("awesome"));

  if (Props.option === "new") {
    const note = {
      id: new Date().getTime(),
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, excepturi?",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolore, adipisci accusantium laborum id eum aspernatur, a nisi voluptatem illo reprehenderit illum repellat itaque commodi necessitatibus similique delectus laboriosam architecto.",
      dateTime: new Date().toLocaleString(),
      layout: {
        theme: Object.entries(Themes())[
          Math.floor(Math.random() * Object.entries(Themes()).length)
        ][0],
        bookmark: false,
        archive: false,
        trash: false,
      },
    };

    if (!awesome)
      return localStorage.setItem("awesome", JSON.stringify({ notes: [note] }));

    return localStorage.setItem(
      "awesome",
      JSON.stringify({ notes: awesome.notes.concat(note) })
    );
  }

  if (Props.option === "read") {
    if (!awesome) return [];
    return awesome.notes;
  }

  // Update

  if (Props.option === "update") {
    const key = Object.entries(Props.update.query)[0][0];

    if (key === "title")
      awesome.notes[Props.update.key].title = Props.update.query.title;
    if (key === "desc")
      awesome.notes[Props.update.key].desc = Props.update.query.desc;
    // Layout Upadte
    if (key === "theme")
      awesome.notes[Props.update.key].layout.theme = Props.update.query.theme;
    if (key === "trash")
      awesome.notes[Props.update.key].layout.trash = Props.update.query.trash;
    if (key === "archive")
      awesome.notes[Props.update.key].layout.archive =
        Props.update.query.archive;
    if (key === "bookmark")
      awesome.notes[Props.update.key].layout.bookmark =
        Props.update.query.bookmark;

    return localStorage.setItem(
      "awesome",
      JSON.stringify({ notes: awesome.notes })
    );
  }

  if (Props.option === "delete")
    return localStorage.setItem(
      "awesome",
      JSON.stringify({
        notes: awesome.notes.filter(
          (item) => item !== awesome.notes[Props.key]
        ),
      })
    );
}
