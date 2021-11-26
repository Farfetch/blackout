import { RESET_ENTITIES } from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:entities/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: RESET_ENTITIES,
    });
  };
