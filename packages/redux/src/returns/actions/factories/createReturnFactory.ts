import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostReturn,
  PostReturnData,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating a return.
 *
 * @param postReturn - Post return client.
 *
 * @returns Thunk factory.
 */
const createReturnFactory =
  (postReturn: PostReturn) =>
  (data: PostReturnData, config?: Config) =>
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
