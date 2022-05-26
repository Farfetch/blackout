import {
  FETCH_RETURN_FAILURE,
  FETCH_RETURN_REQUEST,
  FETCH_RETURN_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';
import type {
  GetReturn,
  Query,
  Return,
} from '@farfetch/blackout-client/returns/types';

/**
 * @param id     - Return identifier.
 * @param query  - Query parameters for retrieving the return.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining a specific return.
 *
 * @param getReturn - Get return client.
 *
 * @returns Thunk factory.
 */
const fetchReturnFactory =
  (getReturn: GetReturn) =>
  (id: number, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: FETCH_RETURN_REQUEST,
      });
      const result = await getReturn(id, query, config);

      dispatch({
        payload: normalize(result, returnSchema),
        type: FETCH_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnFactory;
