import {
  FETCH_SIZESCALE_MAPPINGS_FAILURE,
  FETCH_SIZESCALE_MAPPINGS_REQUEST,
  FETCH_SIZESCALE_MAPPINGS_SUCCESS,
} from '../../actionTypes';
import { generateSizeScaleMappingsHash } from '../../utils';
import type { Dispatch } from 'redux';
import type { FetchSizeScaleMappingsAction } from '../../types';
import type {
  GetSizeScaleMappings,
  SizeScaleMapping,
  SizeScaleMappingsQuery,
} from '@farfetch/blackout-client/sizeScales/types';

/**
 * @param query  - Query with parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch size scale
 * mappings.
 *
 * @param getSizeScaleMappings - Get size scale mappings client.
 *
 * @returns Thunk factory.
 */
const fetchSizeScaleMappingsFactory =
  (getSizeScaleMappings: GetSizeScaleMappings) =>
  (query: SizeScaleMappingsQuery, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchSizeScaleMappingsAction>,
  ): Promise<SizeScaleMapping> => {
    const hash = generateSizeScaleMappingsHash(query);

    dispatch({
      meta: { hash, query },
      type: FETCH_SIZESCALE_MAPPINGS_REQUEST,
    });

    try {
      const result = await getSizeScaleMappings(query, config);

      dispatch({
        meta: { hash, query },
        payload: { result },
        type: FETCH_SIZESCALE_MAPPINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { hash, query },
        payload: { error },
        type: FETCH_SIZESCALE_MAPPINGS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSizeScaleMappingsFactory;
