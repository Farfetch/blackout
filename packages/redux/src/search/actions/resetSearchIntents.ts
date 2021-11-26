import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset search intents state to its initial value.
 *
 * @memberof module:search/actions
 *
 * @name resetSearchIntents
 *
 * @returns {Function} Thunk factory.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SEARCH_INTENTS,
    });
  };
