import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserCredit,
  toBlackoutError,
  User,
} from '@farfetch/blackout-client';
import isEmpty from 'lodash/isEmpty';
import type { Dispatch } from 'redux';

/**
 * Fetch user credit balance.
 *
 * @param getUserCredit - Get credit client.
 *
 * @returns Thunk factory.
 */

export const fetchUserCreditFactory =
  (getUserCredit: GetUserCredit) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      const defaultZeroBalanceCredit = {
        currency: null,
        value: 0,
        formattedValue: null,
      };

      dispatch({
        type: actionTypes.FETCH_USER_CREDIT_REQUEST,
      });

      const result = await getUserCredit(userId, config);
      const credit = isEmpty(result[0]) ? defaultZeroBalanceCredit : result[0];

      dispatch({
        payload: { credit },
        type: actionTypes.FETCH_USER_CREDIT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_CREDIT_FAILURE,
      });

      throw error;
    }
  };
