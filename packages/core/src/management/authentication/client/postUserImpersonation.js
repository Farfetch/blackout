import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';
import client, { adaptError, configManagement } from '../../../helpers/client';

/**
 * @typedef {object} PostUserImpersonationData
 *
 * @alias PostUserImpersonationData
 * @memberof module:managementAuthentication/client
 *
 * @property {string} impersonatorUserName  - The impersonator user name.
 * @property {string} impersonatorPassword  - The impersonator password.
 * @property {string} impersonateeUserName  - The user name to impersonate.
 */

/**
 * Creates user impersonation.
 *
 * @function postUserImpersonation
 * @memberof module:managementAuthentication/client
 *
 * @param {PostUserImpersonationData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config = configManagement) => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'postUserImpersonation',
    'Please refer to the respective support Slack channel for the private repository with this client.',
  );
  return client
    .post('/authentication/v1/userImpersonations', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
