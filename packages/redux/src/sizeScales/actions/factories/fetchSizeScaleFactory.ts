import {
  FETCH_SIZE_SCALE_FAILURE,
  FETCH_SIZE_SCALE_REQUEST,
  FETCH_SIZE_SCALE_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import sizeScale from '../../../entities/schemas/sizeScale';
import type { Dispatch } from 'redux';
import type { FetchSizeScaleAction } from '../../types';
import type {
  GetSizeScale,
  SizeScale,
} from '@farfetch/blackout-client/sizeScales/types';

/**
 * @param sizeScaleId - Numeric identifier of the size scale.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a specific
 * size scale for a given size scale id.
 *
 * @param getSizeScale - Get size scale client.
 *
 * @returns Thunk factory.
 */
const fetchSizeScaleFactory =
  (getSizeScale: GetSizeScale) =>
  (sizeScaleId: number, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch<FetchSizeScaleAction>): Promise<SizeScale> => {
    try {
      dispatch({
        meta: { sizeScaleId },
        type: FETCH_SIZE_SCALE_REQUEST,
      });

      const result = await getSizeScale(sizeScaleId, config);

      dispatch({
        meta: { sizeScaleId },
        payload: normalize(result, sizeScale),
        type: FETCH_SIZE_SCALE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { sizeScaleId },
        payload: { error: toError(error) },
        type: FETCH_SIZE_SCALE_FAILURE,
      });

      throw error;
    }
  };

export default fetchSizeScaleFactory;
