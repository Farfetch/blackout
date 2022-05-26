import {
  FETCH_GIFT_CARD_BALANCE_FAILURE,
  FETCH_GIFT_CARD_BALANCE_REQUEST,
  FETCH_GIFT_CARD_BALANCE_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type {
  Balance,
  PostCheckGiftCardBalance,
  PostCheckGiftCardBalanceData,
} from '@farfetch/blackout-client/payments/types';
import type { Config } from '@farfetch/blackout-client/types';
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
        type: FETCH_GIFT_CARD_BALANCE_REQUEST,
      });

      const result = await postCheckGiftCardBalance(data, config);

      dispatch({
        payload: result,
        type: FETCH_GIFT_CARD_BALANCE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_GIFT_CARD_BALANCE_FAILURE,
      });

      throw error;
    }
  };

export default fetchGiftCardBalanceFactory;
