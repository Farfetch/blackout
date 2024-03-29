import * as actionTypes from '../../actionTypes.js';
import {
  type Brand,
  type Config,
  type GetBrand,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand.js';
import type { Dispatch } from 'redux';
import type { FetchBrandAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { brandId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_BRAND_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchBrandFactory;
