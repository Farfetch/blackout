import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetExchangesStateAction } from '../index.js';

/**
 * Reset exchanges state and related entities to its initial value.
 *
 * @returns - Thunk.
 */
const resetExchanges =
  () => (dispatch: Dispatch<ResetExchangesStateAction>) => {
    dispatch({
      type: actionTypes.RESET_EXCHANGES,
    });
  };

export default resetExchanges;
