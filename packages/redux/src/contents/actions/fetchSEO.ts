import { fetchSEOFactory } from './factories';
import { getSEO } from '@farfetch/blackout-client/contents';

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
 * @function fetchSEO
 * @memberof module:contents/actions
 *
 * @param {Function} getSEO - Get SEO client.
 *
 * @returns {FetchSEOThunkFactory} Thunk factory.
 */
export default fetchSEOFactory(getSEO);
