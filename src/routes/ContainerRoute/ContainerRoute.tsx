import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { selectIsInitialLoad, toggleOffIsInitialLoad } from "slices";
import { AnimatedOutlet } from "utils";
import { initialAnimationDelay } from "consts";

// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
// TODO describe how this handles animated transitions between routes in README
export const ContainerRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isInitialLoad = useSelector(selectIsInitialLoad);
  const variants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    // Delay is 0.2 for smooth transition from splash screen on initial load
    // and 0.1 for smooth transition between routes, since 0 sometimes doesn't animate transition
    visible: { opacity: 1, transition: { duration: 0.3, delay: isInitialLoad ? initialAnimationDelay + 0.2 : 0.1 } },
  };

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(toggleOffIsInitialLoad());
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={variants} initial="hidden" animate="visible" exit="hidden">
        <AnimatedOutlet />
      </motion.div>
    </AnimatePresence>
  );
};
