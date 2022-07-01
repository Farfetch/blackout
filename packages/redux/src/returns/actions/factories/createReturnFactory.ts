import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostReturn,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';

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
  (data: Return, config?: Config) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: actionTypes.CREATE_RETURN_REQUEST,
      });

      const result = await postReturn(data, config);

      dispatch({
        payload: normalize(result, returnSchema),
        type: actionTypes.CREATE_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default createReturnFactory;
