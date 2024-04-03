import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, domAnimation, LazyMotion, motion } from "framer-motion";
import { useMotionStyle } from "hooks";
import { selectDifficulty, setDifficulty } from "slices";
import { AnimatedButton } from "components";
import { Difficulty } from "enums";
import styles from "./DifficultySelector.module.scss";

export const DifficultySelector = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const { motionStyle } = useMotionStyle();
  const difficulty = useSelector(selectDifficulty);

  const handleItemClick = (selectedDifficulty: Difficulty) => {
    setIsOpen(false);
    dispatch(setDifficulty(Difficulty[selectedDifficulty]));
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div className={styles.wrapper}>
        <AnimatedButton onClick={() => setIsOpen(!isOpen)}>Difficulty: {difficulty}</AnimatedButton>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.dropdownWrapper}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -8 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <motion.div className={styles.dropdown} style={{ boxShadow: motionStyle.boxShadow }}>
                {Object.values(Difficulty).map((item, index) => {
                  return (
                    <motion.div
                      className={styles.dropdownItem}
                      key={index}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 1.5 }}
                      onClick={() => handleItemClick(item)}
                    >
                      {item}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LazyMotion>
  );
};
