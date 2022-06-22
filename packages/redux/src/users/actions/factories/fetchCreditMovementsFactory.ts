import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCreditMovements,
  GetCreditMovementsQuery,
} from '@farfetch/blackout-client/users/types';

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
 * @param getCreditMovements - Get credit movements client.
 *
 * @returns Thunk factory.
 */
const fetchCreditMovementsFactory =
  (getCreditMovements: GetCreditMovements) =>
  (id: number, query: GetCreditMovementsQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_REQUEST,
      });

      const result = await getCreditMovements(id, query, config);

      dispatch({
        payload: { creditMovements: result },
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchCreditMovementsFactory;
