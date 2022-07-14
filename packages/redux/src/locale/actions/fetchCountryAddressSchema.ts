import { fetchCountryAddressSchemaFactory } from './factories';
import { getCountryAddressSchema } from '@farfetch/blackout-client';

/**
 * Obtains the address schema for a country specified with 'id'.
 */

export const fetchCountryAddressSchema = fetchCountryAddressSchemaFactory(
  getCountryAddressSchema,
);
