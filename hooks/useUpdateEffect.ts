import { useEffect, useRef } from "react";

/**
 * dependency array 변경시 불리는 useEffect.
 * @param {Function} effect
 *  @param {Array} deps
 */
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirst = useRef<boolean>(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isFirst.current) return effect();
    isFirst.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
