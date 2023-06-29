import { useState, useMemo, useEffect } from "react";

let options = {
  root: document.getElementById("[data-scroll-root]"),
  rootMargin: "-69px 0px 0px 0px",
  trackVisibility: true,
  threshold: 0,
  delay: 100,
};

export default function useOnScreen(ref) {
  //options.threshold = isCurrent ? 0.1 : 0.9;
  const [isIntersecting, setIntersecting] = useState(false);
  //const [intersectionRatio, setintersectionRatio] = useState(0.);
  const observer = useMemo(() =>
    new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        //setintersectionRatio(entry.intersectionRatio);
      },
      options
    ),[]
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => { observer.disconnect(); };
  }, [observer, ref]);

  return {"isIntersecting": isIntersecting, /*"intersectionRatio": intersectionRatio*/};
}