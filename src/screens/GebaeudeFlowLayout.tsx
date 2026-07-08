import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";

const DETAIL_PATTERN = /^\/gebaeude\/[^/]+$/;

const variants = {
  enter: (custom: { enterX: string }) => ({ x: custom.enterX }),
  center: { x: "0%" },
  exit: (custom: { exitX: string }) => ({ x: custom.exitX }),
};

export function GebaeudeFlowLayout() {
  const location = useLocation();
  const isDetail = DETAIL_PATTERN.test(location.pathname);

  const prevPathRef = useRef(location.pathname);
  const prevPath = prevPathRef.current;
  const prevWasDetail = DETAIL_PATTERN.test(prevPath);
  // Navigating directly from one building's detail screen to another (e.g. "Weiter zu Gebäude 2").
  const isSiblingForward = isDetail && prevWasDetail && prevPath !== location.pathname;

  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Detail screens normally live "in front of" and slide to/from the right.
  // The list always sits "behind" and shifts partially left/right underneath.
  // Between two sibling detail screens, the leaving one instead slides out to the left.
  const enterX = isDetail ? "100%" : "-30%";
  const normalExitX = prevWasDetail ? "100%" : "-30%";
  const exitX = isSiblingForward ? "-100%" : normalExitX;
  const custom = { enterX, exitX };

  return (
    <div className="flex flex-col h-full">
      <Header title={isDetail ? undefined : "Elementargefahren"} />
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <AnimatePresence initial={false} custom={custom}>
          <motion.div
            key={location.pathname}
            custom={custom}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 33, mass: 1 }}
            style={{ zIndex: isDetail ? 2 : 1 }}
            className="absolute inset-0 h-full overflow-y-auto phone-scroll"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
