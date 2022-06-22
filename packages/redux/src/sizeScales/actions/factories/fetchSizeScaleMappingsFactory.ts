import * as actionTypes from '../../actionTypes';
import { generateSizeScaleMappingsHash } from '../../utils';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type { FetchSizeScaleMappingsAction } from '../../types';
import type {
  GetSizeScaleMappings,
  SizeScaleMapping,
  SizeScaleMappingsQuery,
} from '@farfetch/blackout-client/sizeScales/types';
import type { Nullable } from '@farfetch/blackout-redux/types';

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
    let hash: Nullable<string> = null;

    try {
      hash = generateSizeScaleMappingsHash(query);
      dispatch({
        meta: { hash, query },
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST,
      });

      const result = await getSizeScaleMappings(query, config);

      dispatch({
        meta: { hash, query },
        payload: { result },
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { hash: hash as string, query },
        payload: { error: toError(error) },
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSizeScaleMappingsFactory;
