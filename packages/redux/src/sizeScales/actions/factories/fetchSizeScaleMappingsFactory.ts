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
 * @typedef {object} FetchSizeScaleMappingsQuery
 *
 * @alias FetchSizeScaleMappingsQuery
 * @memberof module:sizeScales/actions
 *
 * @property {number} [gender] - Filter size scales mappings for a gender:
 * 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid.
 * @property {number} [brand] - Filter size scales mappings for a given brand,
 * specified by its numeric identifier. If Brand has value, the API ignores the
 * category value.
 * @property {number} sizeScale - Filter size scales mappings for a specific
 * size scale, specified by its numeric identifier.
 * @property {number} [category] - For a given category, will filter size scale
 * mapping for the primary brand associated with it on these type settings. If
 * no settings are configured, will fallback to return only size scales without
 * brand association. If brand value is null this category value is use to find
 * a brand associated.
 */

/**
 * @callback FetchSizeScaleMappingsThunkFactory
 * @param {FetchSizeScaleMappingsQuery} query - Query with parameters to
 * apply to the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch size
 * scale mappings.
 *
 * @memberof module:sizeScales/actions/factories
 *
 * @param {Function} getSizeScaleMappings - Get size scale mappings client.
 *
 * @returns {FetchSizeScaleMappingsThunkFactory} Thunk factory.
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
