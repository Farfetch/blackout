/**
 * Merchants locations client.
 *
 * @module merchantsLocations/client
 * @category Merchants locations
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/merchantsLocations/client',
  '@farfetch/blackout-core/merchantsLocations',
);

export { default as getMerchantsLocations } from './getMerchantsLocations';
