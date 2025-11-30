import BookmarkPage from "./components/Bookmark/BookmarkPage";

export const tagsArray = [
  { id: 1, name: "AI", value: "" },
  { id: 2, name: "Community", value: "" },
  { id: 3, name: "Compatibility", value: "" },
  { id: 4, name: "CSS", value: "" },
  { id: 5, name: "Design", value: "" },
  { id: 6, name: "Framework", value: "" },
  { id: 7, name: "Git", value: "" },
  { id: 8, name: "HTML", value: "" },
  { id: 9, name: "JavaScript", value: "" },
  { id: 10, name: "Layout", value: "" },
  { id: 11, name: "Learning", value: "" },
  { id: 12, name: "Performance", value: "" },
  { id: 13, name: "Practice", value: "" },
  { id: 14, name: "Reference", value: "" },
  { id: 15, name: "Tips", value: "" },
  { id: 16, name: "Tools", value: "" },
];

export const getDate = (date) => {
  const dates = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(date);

  return d.getDate() + " " + dates[d.getMonth()];
};
