import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetReturn,
  type Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining a specific return.
 *
 * @param getReturn - Get return client.
 *
 * @returns Thunk factory.
 */
const fetchReturnFactory =
  (getReturn: GetReturn) =>
  (returnId: Return['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: actionTypes.FETCH_RETURN_REQUEST,
        meta: { returnId },
      });

      const result = await getReturn(returnId, config);

      dispatch({
        type: actionTypes.FETCH_RETURN_SUCCESS,
        meta: { returnId },
        payload: normalize(result, returnSchema),
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_RETURN_FAILURE,
        meta: { returnId },
        payload: { error: errorAsBlackoutError },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchReturnFactory;
