import * as actionTypes from '../../actionTypes';
import {
  Brand,
  Config,
  GetBrand,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand';
import type { Dispatch } from 'redux';
import type { FetchBrandAction } from '../../types';

/**
 * @param brandId - Numeric identifier of the brand.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a brand
 * with given brand id.
 *
 * @param getBrand - Get brand client.
 *
 * @returns Thunk factory.
 */
const fetchBrandFactory =
  (getBrand: GetBrand) =>
  (brandId: Brand['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchBrandAction>): Promise<Brand> => {
    try {
      dispatch({
        meta: { brandId },
        type: actionTypes.FETCH_BRAND_REQUEST,
      });

      const result = await getBrand(brandId, config);

      dispatch({
        meta: { brandId },
        payload: normalize(result, brand),
        type: actionTypes.FETCH_BRAND_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { brandId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_BRAND_FAILURE,
      });

      throw error;
    }
  };

export default fetchBrandFactory;
