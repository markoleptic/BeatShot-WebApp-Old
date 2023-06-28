import { useState, useMemo, useEffect } from "react";

const options = {
  root: document.getElementById("article.article"),
  rootMargin: "0px 10px 0px 10px",
  threshold: 0.5,
  trackVisibility: true,
  delay: 100,
};

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useMemo(() =>
      new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        options
      ),[]
  );
  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isIntersecting;
}
