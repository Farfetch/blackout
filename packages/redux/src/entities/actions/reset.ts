import { RESET_ENTITIES } from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: RESET_ENTITIES,
    });
  };
