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
 * Create Content Version Publications by version ID.
 *
 * @function postSpaceContentVersionPublications
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The content type space identifier.
 * @param {string} contentId - The content identifier.
 * @param {string} versionId - The content version identifier.
 * @param {object} data - The content object.
 * @param {string} data.environmentCode - The environment code.
 * @param {string} data.versionId - The version identifier.
 * @param {Date} [data.createdDate] - The date created for the publication.
 * @param {Date} [data.updatedDate] - The updated date for the publication.
 * @param {('Inactive'|'Active')} data.status - The status of the publication.
 * @param {object[]} [data.targets] - The targets of the publication.
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
    'postContentVersionPublications',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .post(
      join(
        '/content/v1/spaces',
        spaceCode,
        'contents',
        contentId,
        'versions',
        versionId,
        'publications',
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
