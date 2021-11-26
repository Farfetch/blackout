import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';
import type { QuerySEO, SEOMetadata } from './types';

/**
 * Method responsible for searching the seo metadata for a specific page type.
 *
 * @memberof module:contents
 *
 * @param {QuerySEO} query - Query object with search terms to apply.
 * @param {string} query.pageType - The type of the page we are searching (pages|stories...).
 * @param {object} query.param - An object containing some parameters for product listing (BrandName|CategoryName|TotalNumberItems...).
 * @param {string} query.path - The pathname of the location.
 * @param {string} query.subPageType - The sub group of pages about products.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<SEOMetadata>} Promise that will resolve when the call to the endpoint finishes.
 */
const getSEO = (query: QuerySEO, config?: Config): Promise<SEOMetadata> =>
  client
    .get(join('/seo/metadata', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSEO;
