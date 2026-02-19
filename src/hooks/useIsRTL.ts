import { useEffect, useState } from "react";

const useIsRTL = () => {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const updateDirection = () => {
      const dir =
        document.documentElement.dir ||
        document.documentElement.getAttribute("dir") ||
        getComputedStyle(document.documentElement).direction;
      setIsRTL(dir === "rtl");
    };

    updateDirection(); // Set initially

    const observer = new MutationObserver(() => {
      updateDirection(); // Re-check on attribute change
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  return isRTL;
};

export default useIsRTL;
