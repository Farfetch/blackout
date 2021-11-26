import {
  FETCH_GIFT_CARD_BALANCE_FAILURE,
  FETCH_GIFT_CARD_BALANCE_REQUEST,
  FETCH_GIFT_CARD_BALANCE_SUCCESS,
} from '../../actionTypes';
import type {
  Balance,
  PostCheckGiftCardBalance,
  PostCheckGiftCardBalanceData,
} from '@farfetch/blackout-client/payments/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchGiftCardBalanceAction } from '../../types';

/**
 * @typedef {object} FetchGiftCardBalanceData
 * @property {string} giftCardNumber - Gift card number.
 * @property {string} giftCardCsc - Gift card csc.
 */

/**
 * @callback FetchGiftCardBalanceThunkFactory
 * @param {FetchGiftCardBalanceData} data - Details of the gift card balance.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the gift card balance.
 *
 * @function fetchGiftCardBalanceFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} postCheckGiftCardBalance - Post check gift card balance
 * client.
 *
 * @returns {FetchGiftCardBalanceThunkFactory} Thunk factory.
 */
const fetchGiftCardBalanceFactory =
  (postCheckGiftCardBalance: PostCheckGiftCardBalance) =>
  (data: PostCheckGiftCardBalanceData, config?: Config) =>
  async (dispatch: Dispatch<FetchGiftCardBalanceAction>): Promise<Balance> => {
    dispatch({
      type: FETCH_GIFT_CARD_BALANCE_REQUEST,
    });

    try {
      const result = await postCheckGiftCardBalance(data, config);

      dispatch({
        payload: result,
        type: FETCH_GIFT_CARD_BALANCE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_GIFT_CARD_BALANCE_FAILURE,
      });

      throw error;
    }
  };

export default fetchGiftCardBalanceFactory;
