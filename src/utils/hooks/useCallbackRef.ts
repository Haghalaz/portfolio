import { useRef, useEffect, useMemo } from 'react';

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
function useCallbackRef<Args extends unknown[], Return>(callback: ((...args: Args) => Return) | undefined): (...args: Args) => Return | undefined {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => (...args: Args) => callbackRef.current?.(...args), []);
}

export { useCallbackRef };
