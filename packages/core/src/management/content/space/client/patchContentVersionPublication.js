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
 * Method responsible for a content version publication.
 *
 * @function patchSpaceContentVersionPublication
 * @memberof module:content/space/client
 *
 * @param {string}   spaceCode - The content type space identifier.
 * @param {string}   contentId - The content identifier.
 * @param {string}   versionId - The content version identifier.
 * @param {string}   publicationId - The publication identifier.
 * @param {object[]} data - The component version data.
 * @param {object}   [data.value] - The publication data value.
 * @param {string}   data.path - The path to patch.
 * @param {string}   data.op - The type of operation (e.g. 'replace').
 * @param {string}   [data.from] - The source of the property.
 * @param {object}   [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (
  spaceCode,
  contentId,
  versionId,
  publicationId,
  data,
  config = configApiBlackAndWhite,
) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'patchContentVersionPublication',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .patch(
      join(
        '/content/v1/spaces',
        spaceCode,
        'contents',
        contentId,
        'versions',
        versionId,
        'publications',
        publicationId,
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
