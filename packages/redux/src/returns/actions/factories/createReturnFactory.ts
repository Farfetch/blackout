import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';
import type {
  PostReturn,
  Query,
  Return,
} from '@farfetch/blackout-client/returns/types';

/**
 * @param data   - Details of the Return to be created.
 * @param query  - Query parameters for creating the return.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating a return.
 *
 * @param postReturn - Post return client.
 *
 * @returns Thunk factory.
 */
const createReturnFactory =
  (postReturn: PostReturn) =>
  (data: Return, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: actionTypes.CREATE_RETURN_REQUEST,
      });

      const result = await postReturn(data, query, config);

      dispatch({
        payload: normalize(result, returnSchema),
        type: actionTypes.CREATE_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default createReturnFactory;
