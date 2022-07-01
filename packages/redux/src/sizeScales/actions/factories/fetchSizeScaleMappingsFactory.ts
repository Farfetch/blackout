import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSizeScaleMappings,
  SizeScaleMapping,
  SizeScaleMappingsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSizeScaleMappingsHash } from '../../utils';
import type { Dispatch } from 'redux';
import type { FetchSizeScaleMappingsAction } from '../../types';
import type { Nullable } from '../../../types';

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
  (query: SizeScaleMappingsQuery, config?: Config) =>
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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE,
      });

      throw error;
    }
  };

export default fetchSizeScaleMappingsFactory;
