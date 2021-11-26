import {
  FETCH_BRAND_FAILURE,
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand';
import type { Brand, GetBrand } from '@farfetch/blackout-client/brands/types';
import type { Dispatch } from 'redux';
import type { FetchBrandAction } from '../../types';

/**
 * @callback FetchBrandThunkFactory
 *
 * @param {number} brandId - Numeric identifier of the brand.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a
 * brand with given brand id.
 *
 * @memberof module:brands/actions/factories
 *
 * @param {Function} getBrand - Get brand client.
 *
 * @returns {FetchBrandThunkFactory} Thunk factory.
 */
const fetchBrandFactory =
  (getBrand: GetBrand) =>
  (brandId: Brand['id'], config?: Record<string, unknown>) =>
  async (dispatch: Dispatch<FetchBrandAction>): Promise<Brand> => {
    dispatch({
      meta: { brandId },
      type: FETCH_BRAND_REQUEST,
    });

    try {
      const result = await getBrand(brandId, config);

      dispatch({
        meta: { brandId },
        payload: normalize(result, brand),
        type: FETCH_BRAND_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { brandId },
        payload: { error },
        type: FETCH_BRAND_FAILURE,
      });

      throw error;
    }
  };

export default fetchBrandFactory;
