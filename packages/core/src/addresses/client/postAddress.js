import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedProp } from '../../helpers';
import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PropsObject
 *
 * @alias PropsObject
 * @memberof module:addresses/client
 *
 * @property {number} userId - Identifier of the user.
 */

/**
 * Responsible for creating an address for the current user.
 *
 * @function postAddress
 * @memberof module:addresses/client
 *
 * @param {PropsObject|object} props - Object containing userId.
 * @param {object} data - Object containing the address information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (props, data, config) => {
  const includesUserId = !!props?.userId;
  const newData = {
    ...data,
    country: {
      ...data?.country,
      alpha2Code: data?.country?.code,
    },
  };
  const args = includesUserId
    ? [`/account/v1/users/${props.userId}/addresses`, newData, config]
    : ['/legacy/v1/addressbook', props, data];

  includesUserId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'postAddress',
      'none, i.e. previously there was no param, but now there is a props param',
      'props',
    );

  return client
    .post(...args)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
