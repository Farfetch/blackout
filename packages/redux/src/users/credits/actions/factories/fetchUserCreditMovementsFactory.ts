import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserCreditMovements,
  GetUserCreditMovementsQuery,
  toBlackoutError,
  User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Create get user credit movements.
 *
 * @param getUserCreditMovements - Get credit movements client.
 *
 * @returns Thunk factory.
 */
export const fetchUserCreditMovementsFactory =
  (getUserCreditMovements: GetUserCreditMovements) =>
  (userId: User['id'], query: GetUserCreditMovementsQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_REQUEST,
      });

      const result = await getUserCreditMovements(userId, query, config);

      dispatch({
        payload: { creditMovements: result },
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_FAILURE,
      });

      throw error;
    }
  };
