import { buildSEOPathname } from '../../utils';
import {
  GET_SEO_FAILURE,
  GET_SEO_REQUEST,
  GET_SEO_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} GetSEOQuery
 * @property {string} pageType - The type of the page we are searching (pages|stories...).
 * @property {object} param - An object containing some parameters for product listing (BrandName|CategoryName|TotalNumberItems...).
 * @property {string} path - The pathname of the location.
 * @property {string} subPageType - The sub group of pages about products.
 */

/**
 * @callback GetSEOThunkFactory
 * @param {GetSEOQuery} query - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load SEO metadata content with a specific query object.
 *
 * @function doGetSEO
 * @memberof module:contents/actions
 *
 * @param {Function} getSEO - Get SEO client.
 *
 * @returns {GetSEOThunkFactory} Thunk factory.
 */
export default getSEO => (query, config) => async dispatch => {
  const pathname = buildSEOPathname(query);

  dispatch({
    meta: { query },
    payload: { pathname },
    type: GET_SEO_REQUEST,
  });

  try {
    const result = await getSEO(query, config);

    dispatch({
      meta: { query },
      payload: { pathname, result },
      type: GET_SEO_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error, pathname },
      type: GET_SEO_FAILURE,
    });

    throw error;
  }
};
