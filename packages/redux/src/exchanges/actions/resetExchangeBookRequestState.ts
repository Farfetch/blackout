import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetExchangeBookRequestStateAction } from '../index.js';

/**
 * Reset exchange book request slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetExchangeBookRequestState =
  () => (dispatch: Dispatch<ResetExchangeBookRequestStateAction>) => {
    dispatch({
      type: actionTypes.RESET_EXCHANGE_BOOK_REQUEST_STATE,
    });
  };

export default resetExchangeBookRequestState;
