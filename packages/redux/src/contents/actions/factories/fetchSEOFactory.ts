import {
  FETCH_SEO_FAILURE,
  FETCH_SEO_REQUEST,
  FETCH_SEO_SUCCESS,
} from '../../actionTypes';
import { generateSEOPathname } from '../../utils';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetSEO,
  QuerySEO,
  SEOMetadata,
} from '@farfetch/blackout-client/contents/types';

/**
 * @typedef {object} FetchSEOQuery
 * @property {string} pageType - The type of the page we are searching (pages|stories...).
 * @property {object} param - An object containing some parameters for product listing (BrandName|CategoryName|TotalNumberItems...).
 * @property {string} path - The pathname of the location.
 * @property {string} subPageType - The sub group of pages about products.
 */

/**
 * @callback FetchSEOThunkFactory
 * @param {FetchSEOQuery} query - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @function fetchSEOFactory
 * @memberof module:contents/actions/factories
 *
 * @param {Function} getSEO - Get SEO client.
 *
 * @returns {FetchSEOThunkFactory} Thunk factory.
 */
export default (getSEO: GetSEO) =>
  (query: QuerySEO, config?: Config) =>
  async (dispatch: Dispatch): Promise<SEOMetadata> => {
    const pathname = generateSEOPathname(query);

    dispatch({
      meta: { query },
      payload: { pathname },
      type: FETCH_SEO_REQUEST,
    });

    try {
      const result = await getSEO(query, config);

      dispatch({
        meta: { query },
        payload: { pathname, result },
        type: FETCH_SEO_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error, pathname },
        type: FETCH_SEO_FAILURE,
      });

      throw error;
    }
  };
