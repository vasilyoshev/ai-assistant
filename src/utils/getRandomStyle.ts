import { Style } from "enums";

export const getRandomStyle = () => {
  const styles = Object.values(Style);
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
};
