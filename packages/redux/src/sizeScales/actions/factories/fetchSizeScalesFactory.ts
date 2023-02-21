import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetSizeScales,
  type SizeScale,
  type SizeScalesQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import sizeScale from '../../../entities/schemas/sizeScale';
import type { Dispatch } from 'redux';
import type { FetchSizeScalesAction } from '../../types';

/**
 * Creates a thunk factory configured with the specified client to fetch size
 * scales.
 *
 * @param getSizeScales - Get size scales client.
 *
 * @returns Thunk factory.
 */
const fetchSizeScalesFactory =
  (getSizeScales: GetSizeScales) =>
  (query: SizeScalesQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchSizeScalesAction>): Promise<SizeScale[]> => {
    try {
      dispatch({
        meta: { query },
        type: actionTypes.FETCH_SIZE_SCALES_REQUEST,
      });

      const result = await getSizeScales(query, config);

      dispatch({
        meta: { query },
        payload: normalize(result, [sizeScale]),
        type: actionTypes.FETCH_SIZE_SCALES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { query },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_SIZE_SCALES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchSizeScalesFactory;
