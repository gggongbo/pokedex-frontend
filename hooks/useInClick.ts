import { RefObject, useEffect, useState } from "react";

/**
 * 컴포넌트 클릭, 컴포넌트 외부 클릭 확인 Hook
 * @param {RefObject<HTMLElement>} ref
 * @returns inClicked, setInClicked
 */
const useInClick = (ref: RefObject<HTMLElement>) => {
  const [inClicked, setInClicked] = useState(false);

  useEffect(() => {
    const handleInsideClick = (e: Event) => {
      if (!e.target) {
        setInClicked(false);

        return;
      }
      if (!ref.current?.contains(e.target as HTMLElement)) {
        setInClicked(false);
      } else {
        setInClicked(true);
      }
    };

    document.addEventListener("mouseup", handleInsideClick);

    return () => {
      document.removeEventListener("mouseup", handleInsideClick);
    };
  }, [ref]);

  return { inClicked, setInClicked };
};

export { useInClick };
