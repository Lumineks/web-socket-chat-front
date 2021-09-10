// accessible colors on white background generator
const colors = [
  "#111827",
  "#4B5563",
  "#DC2626",
  "#D97706",
  "#047857",
  "#1D4ED8",
  "#BE185D",
  "#6D28D9",
  "#312E81",
  "#1E3A8A",
  "#EC4899",
  "#34D399",
  "#252d7a",
  "#e3075d",
];

const colorGenerator = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export default colorGenerator;
