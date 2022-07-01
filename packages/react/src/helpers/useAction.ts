import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

/**
 * Memoizes the action received and binds the dispatch.
 *
 * @param action - Action to be wrapped by a dispatch.
 *
 * @returns Memoized version of the action, with a dispatch.
 */
const useAction = (action: any) => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(action, dispatch),
    [action, dispatch],
  );
};
export default useAction;
