import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import isEmpty from 'lodash/isEmpty';
import type { Dispatch } from 'redux';
import type { GetUserCredit } from '@farfetch/blackout-client/users/credits/types';

/**
 * @param id     - User identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch user credit balance.
 *
 * @param getCredit - Get credit client.
 *
 * @returns Thunk factory.
 */

const fetchCreditFactory =
  (getCredit: GetUserCredit) =>
  (id: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      const defaultZeroBalanceCredit = {
        currency: null,
        value: 0,
        formattedValue: null,
      };

      dispatch({
        type: actionTypes.FETCH_CREDIT_REQUEST,
      });

      const result = await getCredit(id, config);
      const credit = isEmpty(result[0]) ? defaultZeroBalanceCredit : result[0];

      dispatch({
        payload: { credit },
        type: actionTypes.FETCH_CREDIT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CREDIT_FAILURE,
      });

      throw error;
    }
  };

export default fetchCreditFactory;
