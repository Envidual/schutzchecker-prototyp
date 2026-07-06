import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.querySelectorAll(".phone-scroll").forEach((el) => el.scrollTo(0, 0));
  }, [location.pathname]);

  return null;
}
