import {
  FETCH_SIZE_SCALES_FAILURE,
  FETCH_SIZE_SCALES_REQUEST,
  FETCH_SIZE_SCALES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import sizeScale from '../../../entities/schemas/sizeScale';
import type { Dispatch } from 'redux';
import type { FetchSizeScalesAction } from '../../types';
import type {
  GetSizeScales,
  SizeScale,
  SizeScalesQuery,
} from '@farfetch/blackout-client/sizeScales/types';

/**
 * @param query  - Query with parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
  (query: SizeScalesQuery, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch<FetchSizeScalesAction>): Promise<SizeScale[]> => {
    dispatch({
      meta: { query },
      type: FETCH_SIZE_SCALES_REQUEST,
    });

    try {
      const result = await getSizeScales(query, config);

      dispatch({
        meta: { query },
        payload: normalize(result, [sizeScale]),
        type: FETCH_SIZE_SCALES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error },
        type: FETCH_SIZE_SCALES_FAILURE,
      });

      throw error;
    }
  };

export default fetchSizeScalesFactory;
