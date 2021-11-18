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
 * Responsible for getting all the addresses of the current user.
 *
 * @function getAddresses
 * @memberof module:addresses/client
 *
 * @param {PropsObject|object} props - Object containing userId.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (props, config) => {
  const includesUserId = !!props?.userId;
  const args = includesUserId
    ? [`/account/v1/users/${props.userId}/addresses`, config]
    : ['/legacy/v1/addressbook', props];

  includesUserId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'getAddresses',
      'id',
      'props',
    );

  return client
    .get(...args)
    .then(response =>
      includesUserId
        ? response.data.map(address => {
            return {
              ...address,
              isDefaultBillingAddress: address?.isCurrentBilling,
              isDefaultShippingAddress: address?.isCurrentShipping,
              isPreferredAddress: address?.isCurrentPreferred,
            };
          })
        : response.data,
    )
    .catch(error => {
      throw adaptError(error);
    });
};
