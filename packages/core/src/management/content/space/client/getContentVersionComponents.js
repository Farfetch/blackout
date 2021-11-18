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
 * Get Space Content Version Components.
 *
 * @function getSpaceContentVersionComponents
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The content type space identifier.
 * @param {string} templateId - The template identifier.
 * @param {string} versionId - The content version identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (
  spaceCode,
  templateId,
  versionId,
  config = configApiBlackAndWhite,
) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'getContentVersionComponents',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .get(
      join(
        '/content/v1/spaces',
        spaceCode,
        'contents',
        templateId,
        'versions',
        versionId,
        'components',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
