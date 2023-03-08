import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetEntities =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_ENTITIES,
    });
  };

export default resetEntities;
