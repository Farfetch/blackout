import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

/**
 * Memoizes the action received and binds the dispatch.
 *
 * @param   {Function} action - Action to be wrapped by a dispatch.
 *
 * @returns {Function} Memoized version of the action, with a dispatch.
 */
export default action => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(action, dispatch),
    [action, dispatch],
  );
};
