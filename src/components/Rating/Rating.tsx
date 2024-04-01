import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { usePrevious } from "utils";
import styles from "./Rating.module.scss";

interface RatingProps {
  type: "star" | "heart"; // TODO extract to enum
  totalItems: number;
  checkedItems: number;
}
export const Rating = ({ type, totalItems, checkedItems }: RatingProps) => {
  const prevCheckedItems = usePrevious(checkedItems);
  const animationControls = useAnimationControls();
  const IconFilled = type === "star" ? StarRateRoundedIcon : FavoriteRoundedIcon;
  const Icon = type === "star" ? StarOutlineRoundedIcon : FavoriteBorderRoundedIcon;

  useEffect(() => {
    if (checkedItems > prevCheckedItems) {
      animationControls.start((i) => ({
        scale: [1, i === prevCheckedItems ? 1.5 : 1, 1],
        rotate: [0, i === prevCheckedItems ? 360 : 0],
        transition: { duration: 0.5 },
      }));
    } else if (checkedItems < prevCheckedItems) {
      animationControls.start((i) => ({
        scale: [1, i === checkedItems ? 1.5 : 1, 1],
        transition: { duration: 0.5 },
      }));
    }
  }, [checkedItems]);

  return (
    <div className={styles.rating} style={{ color: type === "star" ? "yellow" : "red" }}>
      {Array.from({ length: totalItems }).map((_, i) => (
        <motion.div key={i} className={styles.iconWrapper} animate={animationControls} custom={i}>
          {i < checkedItems ? <IconFilled /> : <Icon />}
        </motion.div>
      ))}
    </div>
  );
};
