import {
  FETCH_BRANDS_FAILURE,
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  RESET_BRANDS_STATE,
  SET_BRANDS_HASH,
} from '../actionTypes';
import { generateBrandsHash } from '../utils';
import { isBrandsResultCached } from '../selectors';
import { normalize } from 'normalizr';
import brand from '../../../entities/schemas/brand';

/**
 * @typedef {object} FetchBrandsQuery
 *
 * @alias FetchBrandsQuery
 * @memberof module:brands/actions
 *
 * @property {number} [page = 1] - Number of the page to get.
 * @property {number} [pageSize = 10000] - Size of each page.
 * @property {number} [gender] - Fetch brands with specific gender.
 * @property {string} [id] - Fetch brands with the specified identifiers,
 * separated by commas.
 * @property {number} [exclusive] - Fetch brands with exclusive products:
 * 0 = Not exclusive, 1 = Exclusive.
 * @property {number} [categoryId] - Fetch brands with specific category.
 * @property {number} [departmentId] - Fetch brands with Luxe (2920) or
 * Lab (2921) products.
 * @property {number} [priceType] - Fetch brands with priceType:
 * 0 = full price, 1 = sale, 2 = private sale.
 */

/**
 * @callback FetchBrandsThunkFactory
 *
 * @param {FetchBrandsQuery} [query] - Query with parameters to fetch brands.
 * @param {boolean} [useCache=false] - If the request result will be cached.
 * @param {object} [setBrandsHash=true] - Allows the brands hash to be set.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for fetch brands for a given query or all brands if no
 * query is provided.
 *
 * @function fetchBrands
 * @memberof module:brands/actions
 *
 * @param {Function} getBrands - Get brands client.
 *
 * @returns {FetchBrandsThunkFactory} - Thunk factory.
 */
export default getBrands =>
  (query, useCache = false, setBrandsHash = true, config) =>
  async (dispatch, getState) => {
    const hash = generateBrandsHash(query);

    // Check if brands data is already fetched.
    // If it is, let the calling code know there's nothing to wait for.
    // If not, dispatch an action to fetch the brands data.
    if (isBrandsResultCached(getState(), hash)) {
      if (useCache) {
        if (!setBrandsHash) {
          return;
        }

        return dispatch({
          meta: { hash },
          type: SET_BRANDS_HASH,
        });
      } else {
        dispatch({
          type: RESET_BRANDS_STATE,
        });
      }
    }

    if (setBrandsHash) {
      dispatch({
        meta: { hash, query },
        type: SET_BRANDS_HASH,
      });
    }

    dispatch({
      meta: { hash, query },
      type: FETCH_BRANDS_REQUEST,
    });

    try {
      const result = await getBrands(query, config);
      dispatch({
        meta: { hash, query },
        payload: normalize(result, {
          entries: [brand],
        }),
        type: FETCH_BRANDS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { hash, query },
        payload: { error },
        type: FETCH_BRANDS_FAILURE,
      });

      throw error;
    }
  };
