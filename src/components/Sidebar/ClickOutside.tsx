import { ClickOutsideProps } from "@/interfaces/Sidebar/ClickOutsideProps";
import React, { useRef, useEffect } from "react";

const ClickOutside: React.FC<ClickOutsideProps> = ({
  children,
  exceptionRef,
  onClick,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * --------------------------------------------------
   *  Mutations
   * --------------------------------------------------
   */
  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      let clickedInside: null | boolean = false;
      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current &&
            wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current &&
            exceptionRef.current.contains(event.target as Node));
      } else {
        clickedInside =
          wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node);
      }
      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]); 

  return (
    <div ref={wrapperRef} className={`${className || ""}`}>
      {children}
    </div>
  );
};

export default ClickOutside;
