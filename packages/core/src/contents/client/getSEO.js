import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for searching the seo metadata for a specific page type.
 *
 * @function getSEO
 * @memberof module:contents/client
 *
 * @param {object} query - Query object with search terms to apply.
 * @param {string} query.pageType - The type of the page we are searching (pages|stories...).
 * @param {object} query.param - An object containing some parameters for product listing (BrandName|CategoryName|TotalNumberItems...).
 * @param {string} query.path - The pathname of the location.
 * @param {string} query.subPageType - The sub group of pages about products.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/seo/metadata', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
