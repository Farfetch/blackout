import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserCreditMovements,
  type GetUserCreditMovementsQuery,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Create get user credit movements.
 *
 * @param getUserCreditMovements - Get credit movements client.
 *
 * @returns Thunk factory.
 */
const fetchUserCreditMovementsFactory =
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserCreditMovementsFactory;
