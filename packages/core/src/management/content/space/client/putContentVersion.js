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
 * Method responsible for update a Content Version.
 *
 * @function putSpaceContentVersion
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The content type space identifier.
 * @param {string} contentId - The content identifier.
 * @param {string} versionId - The content version identifier.
 * @param {object} data - The content version data.
 * @param {string} data.name - Name of the version.
 * @param {string} data.contentId - Identifier of the content entry for this version.
 * @param {string} data.spaceCode - Code of the space. A content is available in a channel space.
 * @param {object} [data.metadata] - Metadata associated to the version.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (
  spaceCode,
  contentId,
  versionId,
  data,
  config = configApiBlackAndWhite,
) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'putContentVersion',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .put(
      join(
        '/content/v1/spaces',
        spaceCode,
        'contents',
        contentId,
        'versions',
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
