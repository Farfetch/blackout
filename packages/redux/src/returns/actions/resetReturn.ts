import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting the fetched returns.
 *
 * @param resetEntities - If return entities should also be resetted.
 *
 * @returns Thunk factory.
 */
const resetReturn =
  (resetEntities = false) =>
  (dispatch: Dispatch): void => {
    dispatch({
      meta: { resetEntities },
      type: actionTypes.RESET_RETURN,
    });
  };

export default resetReturn;
