import {
  FETCH_SIZESCALE_MAPPINGS_FAILURE,
  FETCH_SIZESCALE_MAPPINGS_REQUEST,
  FETCH_SIZESCALE_MAPPINGS_SUCCESS,
} from '../actionTypes';
import { generateSizeScaleMappingsHash } from '../utils';

/**
 * @typedef {object} GetSizeScaleMappingsQuery
 *
 * @alias GetSizeScaleMappingsQuery
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
 * @callback GetSizeScalesThunkFactory
 * @param {GetSizeScaleMappingsQuery} query - Query with parameters to
 * apply to the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading size scale mappings.
 *
 * @function fetchSizeScaleMappings
 * @memberof module:sizeScales/actions
 *
 * @param {Function} getSizeScaleMappings - Get size scale mappings client.
 *
 * @returns {GetSizeScalesThunkFactory} Thunk factory.
 */
export default getSizeScaleMappings => (query, config) => async dispatch => {
  const hash = generateSizeScaleMappingsHash(query);

  dispatch({
    meta: { hash, query },
    type: FETCH_SIZESCALE_MAPPINGS_REQUEST,
  });

  try {
    const result = await getSizeScaleMappings(query, config);

    return dispatch({
      meta: { hash, query },
      payload: { result },
      type: FETCH_SIZESCALE_MAPPINGS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { hash, query },
      payload: { error },
      type: FETCH_SIZESCALE_MAPPINGS_FAILURE,
    });

    throw error;
  }
};
