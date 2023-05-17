import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset returns state and related entities to its initial value.
 *
 * @param resetEntities - If return entities should also be resetted.
 *
 * @returns Thunk factory.
 */
const resetReturns =
  (resetEntities = false) =>
  (dispatch: Dispatch): void => {
    dispatch({
      meta: { resetEntities },
      type: actionTypes.RESET_RETURNS,
    });
  };

export default resetReturns;
