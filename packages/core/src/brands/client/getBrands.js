import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} FetchBrandsQuery
 *
 * @alias FetchBrandsQuery
 * @memberof module:brands/client
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
 * Method responsible for fetching all the brands or a specific set of brands,
 * according to the provided filters.
 *
 * @function getBrands
 * @memberof module:brands/client
 *
 * @param {FetchBrandsQuery} [query] - Query with parameters to fetch brands.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) =>
  client
    .get(
      join('/commerce/v1/brands', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
