import {
  FETCH_CREDIT_BALANCE_FAILURE,
  FETCH_CREDIT_BALANCE_REQUEST,
  FETCH_CREDIT_BALANCE_SUCCESS,
} from '../../actionTypes';
import type {
  Balance,
  PostCheckCreditBalance,
  PostCheckCreditBalanceData,
} from '@farfetch/blackout-client/payments/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchCreditBalanceAction } from '../../types';

/**
 * @param data   - Details for obtaining credit balance.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the user credit balance.
 *
 * @param postCheckCreditBalance - Post check credit balance client.
 *
 * @returns Thunk factory.
 */
const fetchCreditBalanceFactory =
  (postCheckCreditBalance: PostCheckCreditBalance) =>
  (data: PostCheckCreditBalanceData, config?: Config) =>
  async (dispatch: Dispatch<FetchCreditBalanceAction>): Promise<Balance> => {
    dispatch({
      type: FETCH_CREDIT_BALANCE_REQUEST,
    });

    try {
      const result = await postCheckCreditBalance(data, config);

      dispatch({
        payload: result,
        type: FETCH_CREDIT_BALANCE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CREDIT_BALANCE_FAILURE,
      });

      throw error;
    }
  };

export default fetchCreditBalanceFactory;
