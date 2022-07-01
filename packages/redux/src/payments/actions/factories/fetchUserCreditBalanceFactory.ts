import * as actionTypes from '../../actionTypes';
import {
  Balance,
  Config,
  GetUserCreditBalance,
  GetUserCreditBalanceData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserCreditBalanceAction } from '../../types';

/**
 * @param data   - Details for obtaining credit balance.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the user credit balance.
 *
 * @param getUserCreditBalance - Get user credit balance client.
 *
 * @returns Thunk factory.
 */
const fetchUserCreditBalanceFactory =
  (getUserCreditBalance: GetUserCreditBalance) =>
  (data: GetUserCreditBalanceData, config?: Config) =>
  async (
    dispatch: Dispatch<FetchUserCreditBalanceAction>,
  ): Promise<Balance> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CREDIT_BALANCE_REQUEST,
      });

      const result = await getUserCreditBalance(data, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_CREDIT_BALANCE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_CREDIT_BALANCE_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserCreditBalanceFactory;
