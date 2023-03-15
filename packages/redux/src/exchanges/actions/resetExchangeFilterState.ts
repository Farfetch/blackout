import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetExchangeFilterStateAction } from '../index.js';

/**
 * Reset exchange filter slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetExchangeFilterState =
  () => (dispatch: Dispatch<ResetExchangeFilterStateAction>) => {
    dispatch({
      type: actionTypes.RESET_EXCHANGE_FILTER_STATE,
    });
  };

export default resetExchangeFilterState;
