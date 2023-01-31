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
 * Sets the address specified with 'id', as the default billing address.
 *
 * @function putDefaultBillingAddress
 * @memberof module:addresses/client
 *
 * @param {PropsObject|string} props - String is the identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (props, config) => {
  const includesUserId = !!props?.userId;
  const args = includesUserId
    ? [
        `/account/v1/users/${props.userId}/addresses/billing/${props.id}`,
        {},
        config,
      ]
    : [`/legacy/v1/addressbook/billing/${props}`, {}, config];

  includesUserId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'putDefaultBillingAddress',
      'id',
      'props',
    );

  return client
    .put(...args)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
