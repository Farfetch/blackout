import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../../package.json';
import { warnDeprecatedMethod } from '../../../../helpers';
import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../../../helpers/client';
import join from 'proper-url-join';

/**
 * Get all component versions.
 *
 * @function getSpaceComponentVersions
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The components space identifier.
 * @param {string} componentCode - The component identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (spaceCode, componentCode, config = configApiBlackAndWhite) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'getComponentVersions',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .get(
      join(
        '/content/v1/spaces',
        spaceCode,
        'components',
        componentCode,
        'componentversions',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
