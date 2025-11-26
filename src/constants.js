import BookmarkPage from "./components/Bookmark/BookmarkPage";

export const tagsArray = [
  "AI",
  "Community",
  "Compatibility",
  "CSS",
  "Design",
  "Framework",
  "Git",
  "HTML",
  "JavaScript",
  "Layout",
  "Learning",
  "Performance",
  "Practice",
  "Reference",
  "Tips",
  "Tools",
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
