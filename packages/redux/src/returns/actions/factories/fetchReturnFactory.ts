import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetReturn,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';

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
  (id: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: actionTypes.FETCH_RETURN_REQUEST,
      });
      const result = await getReturn(id, config);

      dispatch({
        payload: normalize(result, returnSchema),
        type: actionTypes.FETCH_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnFactory;
