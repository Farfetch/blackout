import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetConfigurations } from './types';

/**
 * @typedef {object} GetConfigurationsQuery
 *
 * @alias GetConfigurationsQuery
 * @memberof module:settings/client
 *
 * @property {number} [pageIndex] - Page Index.
 * @property {number} [pageSize] - Page Size.
 * @property {number} [tenantId] - Tenant Id.
 */

/**
 * Method responsible for fetching all the configurations for the giving criteria.
 *
 * @function getConfiguration
 * @memberof module:settings/client
 *
 * @param {GetConfigurationsQuery} query - Query with parameters to fetch configurations.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
const getConfigurations: GetConfigurations = (query, config) =>
  client
    .get(
      join('/settings/v1/configurations', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getConfigurations;
