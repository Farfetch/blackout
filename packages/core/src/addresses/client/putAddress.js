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
 * Responsible for updating the address information with the specified 'id'.
 *
 * @function putAddress
 * @memberof module:addresses/client
 *
 * @param {PropsObject|string} props - String is the identifier of the address.
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
    ? [
        `/account/v1/users/${props.userId}/addresses/${props.id}`,
        newData,
        config,
      ]
    : [`/legacy/v1/addressbook/${props}`, data, config];

  includesUserId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'putAddress',
      'id',
      'props',
    );

  return (
    client
      .put(...args)
      // This is solution is unorthodox but it's needed to avoid a
      // breaking-change, this will be changed in the next version.
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
      })
  );
};
