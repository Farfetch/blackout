/**
 * Locale client.
 *
 * @module locale/client
 * @category Locale
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/locale/client',
  '@farfetch/blackout-core/locale',
);

export { default as getCities } from './getCities';
export { default as getCountries } from './getCountries';
export { default as getCountry } from './getCountry';
export { default as getCurrencies } from './getCurrencies';
export { default as getStates } from './getStates';
