import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';
import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../../helpers/client';

/**
 * Render React Components.
 *
 * @function postRender
 * @memberof module:content/client
 
 * @param {object} data - The content version data.
 * @param {object} data.schema - The schema to render components.
 * @param {object} data.styles - The styles to render components.
 * @param {string} data.scope - The scope to render components.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (data, config = configApiBlackAndWhite) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'postRender',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .post('/content/v1/render', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
