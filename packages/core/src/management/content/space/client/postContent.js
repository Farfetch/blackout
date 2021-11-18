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
 * Create a content.
 *
 * @function postSpaceContent
 * @memberof module:content/space/client
 *
 * @param {string} spaceCode - The content type space identifier.
 * @param {object} data - The content object.
 * @param {string} data.code - The content code.
 * @param {string} data.contentTypeCode - The content type code.
 * @param {string} data.spaceCode - The content type space identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (spaceCode, data, config = configApiBlackAndWhite) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'postContent',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .post(join('/content/v1/spaces/', spaceCode, 'contents'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
