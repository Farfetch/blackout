import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedProp } from '../../helpers';
import client, { adaptError } from '../../helpers/client';

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @function getSchema
 * @memberof module:addresses/client
 *
 * @param {string|number} isoCode - IsoCode (preferably) or CouyntryId (deprecated).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (isoCode, config) => {
  const isCountryId = !isNaN(isoCode);
  const args = isCountryId
    ? [`/legacy/v1/addressbook/schema/${isoCode}`, config]
    : [`/account/v1/countries/${isoCode}/addressSchemas`, config];

  isCountryId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'getSchema',
      'id',
      'isoCode',
    );

  return client
    .get(...args)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
