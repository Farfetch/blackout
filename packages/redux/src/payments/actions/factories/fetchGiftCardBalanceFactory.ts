import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type {
  Balance,
  PostCheckGiftCardBalance,
  PostCheckGiftCardBalanceData,
} from '@farfetch/blackout-client/payments/types';
import type { Dispatch } from 'redux';
import type { FetchGiftCardBalanceAction } from '../../types';

/**
 * @param data   - Details of the gift card balance.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the gift card balance.
 *
 * @param postCheckGiftCardBalance - Post check gift card balance client.
 *
 * @returns Thunk factory.
 */
const fetchGiftCardBalanceFactory =
  (postCheckGiftCardBalance: PostCheckGiftCardBalance) =>
  (data: PostCheckGiftCardBalanceData, config?: Config) =>
  async (dispatch: Dispatch<FetchGiftCardBalanceAction>): Promise<Balance> => {
    try {
      dispatch({
        type: actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST,
      });

      const result = await postCheckGiftCardBalance(data, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_GIFT_CARD_BALANCE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_GIFT_CARD_BALANCE_FAILURE,
      });

      throw error;
    }
  };

export default fetchGiftCardBalanceFactory;
