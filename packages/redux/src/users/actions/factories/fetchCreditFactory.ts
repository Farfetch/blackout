import {
  FETCH_CREDIT_FAILURE,
  FETCH_CREDIT_REQUEST,
  FETCH_CREDIT_SUCCESS,
} from '../../actionTypes';
import isEmpty from 'lodash/isEmpty';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetCredit } from '@farfetch/blackout-client/users/types';

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
  (getCredit: GetCredit) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch) => {
    const defaultZeroBalanceCredit = {
      currency: null,
      value: 0,
      formattedValue: null,
    };

    dispatch({
      type: FETCH_CREDIT_REQUEST,
    });

    try {
      const result = await getCredit(id, config);
      const credit = isEmpty(result[0]) ? defaultZeroBalanceCredit : result[0];

      dispatch({
        payload: { credit },
        type: FETCH_CREDIT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CREDIT_FAILURE,
      });

      throw error;
    }
  };

export default fetchCreditFactory;
