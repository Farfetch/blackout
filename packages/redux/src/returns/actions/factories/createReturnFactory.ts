import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostReturn,
  type PostReturnData,
  type Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return.js';
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
      const blackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: blackoutError },
        type: actionTypes.CREATE_RETURN_FAILURE,
      });

      throw blackoutError;
    }
  };

export default createReturnFactory;
