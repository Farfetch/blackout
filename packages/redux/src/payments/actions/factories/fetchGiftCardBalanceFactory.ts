import * as actionTypes from '../../actionTypes';
import {
  Balance,
  Config,
  GetGiftCardBalance,
  GetGiftCardBalanceData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchGiftCardBalanceAction } from '../../types';

/**
 * Method responsible for getting the gift card balance.
 *
 * @param getGiftCardBalance - Get gift card balance client.
 *
 * @returns Thunk factory.
 */
const fetchGiftCardBalanceFactory =
  (getGiftCardBalance: GetGiftCardBalance) =>
  (data: GetGiftCardBalanceData, config?: Config) =>
  async (dispatch: Dispatch<FetchGiftCardBalanceAction>): Promise<Balance> => {
    try {
      dispatch({
        type: actionTypes.FETCH_GIFT_CARD_BALANCE_REQUEST,
      });

      const result = await getGiftCardBalance(data, config);

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
