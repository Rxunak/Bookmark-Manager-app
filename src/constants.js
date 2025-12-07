import BookmarkPage from "./components/Bookmark/BookmarkPage";

export const tagsArray = [
  { id: 1, value: "AI", tagNumber: "" },
  { id: 2, value: "Community", tagNumber: "" },
  { id: 3, value: "Compatibility", tagNumber: "" },
  { id: 4, value: "CSS", tagNumber: "" },
  { id: 5, value: "Design", tagNumber: "" },
  { id: 6, value: "Framework", tagNumber: "" },
  { id: 7, value: "Git", tagNumber: "" },
  { id: 8, value: "HTML", tagNumber: "" },
  { id: 9, value: "JavaScript", tagNumber: "" },
  { id: 10, value: "Layout", tagNumber: "" },
  { id: 11, value: "Learning", tagNumber: "" },
  { id: 12, value: "Performance", tagNumber: "" },
  { id: 13, value: "Practice", tagNumber: "" },
  { id: 14, value: "Reference", tagNumber: "" },
  { id: 15, value: "Tips", tagNumber: "" },
  { id: 16, value: "Tools", tagNumber: "" },
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
