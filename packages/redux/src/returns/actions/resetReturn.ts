import { RESET_RETURN } from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting the fetched returns.
 *
 * @function doResetReturn
 * @memberof module:returns/actions
 *
 * @param {boolean} resetEntities - If return entities should also be resetted.
 *
 * @returns {Function} Thunk factory.
 */
export default (resetEntities = false) =>
  (dispatch: Dispatch): void => {
    dispatch({
      meta: { resetEntities },
      type: RESET_RETURN,
    });
  };
