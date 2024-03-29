import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting the gift card balance state.
 */
const resetGiftCardBalance =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_GIFT_CARD_BALANCE_STATE,
    });
  };

export default resetGiftCardBalance;
