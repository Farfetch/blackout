import * as actionTypes from '../../actionTypes.js';
import {
  type Balance,
  type Config,
  type GetUserCreditBalance,
  type GetUserCreditBalanceData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserCreditBalanceAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CREDIT_BALANCE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserCreditBalanceFactory;
