import { useEffect, useRef } from 'react';

/**
 * Get the previous props or state using hooks. Useful to mimic
 * `componentDidUpdate`, which receives previous props and state as arguments,
 * allowing comparing the previous value against the current one.
 *
 * @see {@link https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state}
 *
 * @param value - Any value to be stored as the previous.
 *
 * @returns - The previous value stored.
 */
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

export default usePrevious;
