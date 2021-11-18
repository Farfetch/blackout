import { adaptDate } from '../../helpers/adapters';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedProp } from '../../helpers';
import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

// This is temporary, it will be removed in the next main version
export const adaptGender = value => {
  switch (value) {
    case 'NotDefined':
      return 0;
    case 'Male':
      return 1;
    case 'Female':
      return 2;
    default:
      return null;
  }
};

export const adaptStatus = value => {
  switch (value) {
    case 'Inactive':
      return 0;
    case 'Disabled':
      return 1;
    case 'Locked':
      return 2;
    case 'PendingResetPassword':
      return 3;
    case 'PendingEmailConfirmation':
      return 4;
    case 'Active':
      return 5;
    case 'Unknown':
      return 6;
    default:
      return null;
  }
};

/**
 * Method responsible for fetching the logged user data.
 *
 * @function getProfile
 * @memberof module:profile/client
 *
 * @param {string[]|string} [userExtraInfo] - Additional user details to load.
 *                                            Possibilites are: `bag`,
 *                                            `membership` and `wishlist`.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userExtraInfo, config) => {
  const containsExtraInfo =
    (userExtraInfo instanceof Array && !!userExtraInfo.length) ||
    userExtraInfo instanceof String;

  // When the tenant doesn't provide userExtraInfo the config object will be
  // the first argument.
  const args = containsExtraInfo
    ? [join('/legacy/v1/users/me', { query: { userExtraInfo } }), config]
    : ['/account/v1/users/me', userExtraInfo];

  warnDeprecatedProp(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'getProfile',
    'userExtraInfo',
  );

  return client
    .get(...args)
    .then(response =>
      containsExtraInfo
        ? response.data
        : {
            ...response.data,
            dateOfBirth: `/Date(${adaptDate(response.data.dateOfBirth)})/`,
            gender: adaptGender(response.data.gender),
            status: adaptStatus(response.data.status),
          },
    )
    .catch(error => {
      throw adaptError(error);
    });
};
