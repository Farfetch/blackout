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
 * @property {string} id - Identifier of the address.
 * @property {number} userId - Identifier of the user.
 */

/**
 * Responsible for getting the details of the address with the specified 'id'.
 *
 * @function getAddress
 * @memberof module:addresses/client
 *
 * @param {PropsObject|string} props - String is the identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the
 * endpoint finishes.
 */
export default (props, config) => {
  const includesUserId = !!props?.userId;
  const args = includesUserId
    ? [`/account/v1/users/${props.userId}/addresses/${props.id}`, config]
    : [`/legacy/v1/addressbook/${props}`, config];

  includesUserId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'getAddress',
      'id',
      'props',
    );

  return client
    .get(...args)
    .then(response =>
      includesUserId
        ? {
            ...response.data,
            isDefaultBillingAddress: response?.data?.isCurrentBilling,
            isDefaultShippingAddress: response?.data?.isCurrentShipping,
            isPreferredAddress: response?.data?.isCurrentPreferred,
          }
        : response.data,
    )
    .catch(error => {
      throw adaptError(error);
    });
};
