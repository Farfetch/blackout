import * as actionTypes from '../../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { GetUserCreditMovements } from '@farfetch/blackout-client/src/users/credits/types';
import type { GetUserCreditMovementsQuery } from '@farfetch/blackout-client/src/users/types';
/**
 * @param id     - User identifier.
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Create get user credit movements.
 *
 * @param getUserCreditMovements - Get credit movements client.
 *
 * @returns Thunk factory.
 */
export const fetchUserCreditMovementsFactory =
  (getUserCreditMovements: GetUserCreditMovements) =>
  (id: string, query: GetUserCreditMovementsQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_REQUEST,
      });

      const result = await getUserCreditMovements(id, query, config);

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
