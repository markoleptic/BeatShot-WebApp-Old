import { useState, useMemo, useEffect } from "react";

let options = {
  root: null,
  rootMargin: "-71px 0px 0px 0px",
  //rootMargin: "0px 0px 0px 0px",
  trackVisibility: true,
  threshold: 0,
  delay: 100,
};

export default function useOnScreen(currentRef) {
  //options.threshold = isCurrent ? 0.1 : 0.9;
  const [currentIsIntersecting, setCurrentIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setCurrentIsIntersecting(entry.isIntersecting);
        });
      }, options),
    []
  );

  useEffect(() => {
    observer.observe(currentRef.current);
    return () => {
      observer.disconnect();
    };
  }, [observer, currentRef]);

  return currentIsIntersecting;
}
