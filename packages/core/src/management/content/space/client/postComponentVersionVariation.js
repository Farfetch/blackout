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
 * Create a component version variation.
 *
 * @function postComponentVersionVariation
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The content type space identifier.
 * @param {string} componentCode - The component identifier.
 * @param {string} versionId - The component version identifier.
 * @param {object} data - The variation object.
 * @param {string} data.enabled - The variation enabled or not.
 * @param {string} data.code - The variation identifier.
 * @param {string} data.versionId - The component version identifier.
 * @param {object} data.properties - The aditional properties for component.
 * @param {Date} [data.createdDate] - The date created for the variation.
 * @param {Date} [data.updatedDate] - The updated date for the variation.
 * @param {string} data.createdBy - The user who created the variation.
 * @param {string} data.updatedBy - The user who updated the variation.
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
    'postComponentVersionVariation',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .post(
      join(
        '/content/v1/spaces',
        spaceCode,
        'components',
        componentCode,
        'componentversions',
        versionId,
        'variations',
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
