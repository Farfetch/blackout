// @TODO: Remove this file in version 2.0.0.
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';
import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} FetchSiteFeaturesQuery
 *
 * @alias FetchSiteFeaturesQuery
 * @memberof module:siteFeatures/client
 *
 * @property {string} [name] - Name of the features.
 * @property {string} [type="theme"] - Type of the features (frontend, backend, theme or all).
 * @property {boolean} [status] - Status of the features (true, false or null).
 * @property {number} [siteId] - Site id to get site features.
 */

/**
 * Method responsible for getting the siteFeatures.
 *
 * @function getSiteFeatures
 * @memberof module:siteFeatures/client
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {FetchSiteFeaturesQuery} [query] - Query with parameters to fetch site features.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} - Promise object representing the siteFeatures.
 */
export default (query, config) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/siteFeatures/client/getSiteFeatures',
  );

  return client
    .get(
      join('/settings/v1/sitefeatures', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
