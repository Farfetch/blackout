import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';
import client, { adaptError, configManagement } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * Deletes an user token.
 *
 * @function deleteUserToken
 * @memberof module:managementAuthentication/client
 *
 * @param {string} id - The user token id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config = configManagement) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'deleteUserToken',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );

  return client
    .delete(join('/authentication/v1/userTokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
};
