import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { selectIsInitialLoad, toggleOffIsInitialLoad } from "slices";
import { AnimatedOutlet, usePrimaryColor } from "utils";
import { initialAnimationDelay } from "consts";
import styles from "./ContainerRoute.module.scss";

// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/74190609/exit-animations-with-animatepresence-framer-motion-and-createbrowserrouter-r
// TODO describe how this handles animated transitions between routes in README
export const ContainerRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isInitialLoad = useSelector(selectIsInitialLoad);
  const colorMotionValue = usePrimaryColor();
  const textColor = useMotionTemplate`${colorMotionValue}`;
  const titleMarginTop = useMotionValue("30px");
  const titleLeft = useMotionValue("50%");
  const titleFontSize = useMotionValue("90px");
  const initialOpacity = 0;
  const finalOpacity = 1;
  const routeTransitionDuration = 0.3;
  // +0.2 in order to not overlap with background gradient animation
  const initialRouteDelay = initialAnimationDelay + 0.2;
  const transitionRouteDelay = 0.1;
  const titleOpacity = useMotionValue(initialOpacity);

  const titleStyle = {
    marginTop: titleMarginTop,
    left: titleLeft,
    fontSize: titleFontSize,
    opacity: titleOpacity,
  };

  const variants = {
    hidden: { opacity: initialOpacity, transition: { duration: routeTransitionDuration } },
    // and 0.1 for smooth transition between routes, since 0 sometimes doesn't animate transition
    visible: {
      opacity: finalOpacity,
      transition: {
        duration: routeTransitionDuration,
        delay: isInitialLoad ? initialRouteDelay : transitionRouteDelay,
      },
    },
  };

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(toggleOffIsInitialLoad());
      animate(titleOpacity, finalOpacity, {
        duration: routeTransitionDuration,
        delay: initialRouteDelay,
      });
    }
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/classic":
        animate(titleMarginTop, "0px", { duration: 0.5 });
        animate(titleLeft, "94%", { duration: 0.5 });
        animate(titleFontSize, "40px", { duration: 0.5 });
        break;
        default:
          animate(titleMarginTop, "30px", { duration: 0.5 });
          animate(titleLeft, "50%", { duration: 0.5 });
          animate(titleFontSize, "70px", { duration: 0.5 });
    }
  }, [location.pathname]);

  return (
    <>
      {/* TODO describe name transition logic in readme, both for title and pages overall */}
      <AnimatePresence mode="wait">
        <motion.span className={styles.name} style={titleStyle}>
          pl<motion.span style={{ color: textColor }}>AI</motion.span>box
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.outletWrapper}
          key={location.pathname}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatedOutlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
};
