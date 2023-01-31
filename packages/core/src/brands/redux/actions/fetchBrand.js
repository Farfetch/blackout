import {
  FETCH_BRAND_FAILURE,
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand';

/**
 * @callback FetchBrandThunkFactory
 * @param {number} brandId - Numeric identifier of the brand.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch brand for a given brand id.
 *
 * @function fetchBrand
 * @memberof module:brands/actions
 *
 * @param {Function} getBrand - Get brand client.
 *
 * @returns {FetchBrandThunkFactory} Thunk factory.
 */
export default getBrand => (brandId, config) => async dispatch => {
  dispatch({
    meta: { brandId },
    type: FETCH_BRAND_REQUEST,
  });

  try {
    const result = await getBrand(brandId, config);

    return dispatch({
      meta: { brandId },
      payload: normalize(result, brand),
      type: FETCH_BRAND_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { brandId },
      payload: { error },
      type: FETCH_BRAND_FAILURE,
    });

    throw error;
  }
};
