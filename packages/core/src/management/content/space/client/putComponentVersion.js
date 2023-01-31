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
 * Method responsible for update component version.
 *
 * @function putSpaceComponentVersion
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The components space identifier.
 * @param {string} componentCode - The component identifier.
 * @param {string} versionId - The component version identifier.
 * @param {object} data - The component version data.
 * @param {string} data.componentCode - The component identifier.
 * @param {string} data.name - The component name.
 * @param {boolean} data.active - The component active status.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (
  spaceCode,
  componentCode,
  versionId,
  data,
  config = configApiBlackAndWhite,
) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'putComponentVersion',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .put(
      join(
        '/content/v1/spaces',
        spaceCode,
        'components',
        componentCode,
        'componentversions',
        versionId,
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
