import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';
import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetColorGroupingQuery
 *
 * @alias GetColorGroupingQuery
 * @memberof module:products/client
 *
 * @property {number} [pageIndex=1] - The current page. The default is 1 on
 * the backend side.
 * @property {number} [pageSize=10] - Size of each page, as a number. The
 * default is 10 on the backend side.
 */

/**
 * Method responsible for loading the color grouping for a specific product.
 *
 * @function getColorGrouping
 * @memberof module:products/client
 *
 * @deprecated Since version 1.64.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the getProductGrouping client.
 *
 * @param {number} id - Product identifier.
 * @param {GetColorGroupingQuery} [query] - Query parameters to apply to the
 *  request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, query, config) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/details/client/getColorGrouping',
    '@farfetch/blackout-core/products/details/client/getProductGrouping',
  );

  return client
    .get(join('/commerce/v1/products', id, '/colorgrouping', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
