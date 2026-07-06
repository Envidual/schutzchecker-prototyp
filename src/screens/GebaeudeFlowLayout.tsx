import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "../components/Header";

const DETAIL_PATTERN = /^\/gebaeude\/[^/]+$/;

export function GebaeudeFlowLayout() {
  const location = useLocation();
  const isDetail = DETAIL_PATTERN.test(location.pathname);
  // Detail screens always live "in front of" and slide to/from the right.
  // The list always sits "behind" and shifts partially left/right underneath.
  const offscreenX = isDetail ? "100%" : "-30%";

  return (
    <div className="flex flex-col h-full">
      <Header title={isDetail ? undefined : "Elementargefahren"} />
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ x: offscreenX }}
            animate={{ x: "0%" }}
            exit={{ x: offscreenX }}
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
