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
 * Method responsible for update Content Version Components.
 *
 * @function putSpaceContentVersionComponents
 * @memberof module:content/space/client
 *
 * @param {string}   spaceCode - The content type space identifier.
 * @param {string}   contentId - The template identifier.
 * @param {string}   versionId - The content version identifier.
 * @param {object[]} data - The content version data.
 * @param {string}   data[].type - The content type.
 * @param {string}   data[].name - The content name.
 * @param {object}   [data[].displayOptions] - The content displayOptions.
 * @param {object}   [config] - Custom configurations to send to the client
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
    'putContentVersionComponents',
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
        'components',
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
