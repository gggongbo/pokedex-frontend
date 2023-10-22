import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect, RefObject, useCallback } from "react";

type UseIntersectObserverParemeter = {
  ref: RefObject<HTMLElement>;
  enableObserver?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
};

/**
 * IntersectObserver 관련 커스텀 Hook
 * @param {UseIntersectObserverParemeter} params
 */
const useIntersectObserver = (params: UseIntersectObserverParemeter) => {
  const { ref, enableObserver, hasNextPage, fetchNextPage } = params;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage?.();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [enableObserver, handleObserver]);
};

export { useIntersectObserver };
