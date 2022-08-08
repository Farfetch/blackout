import type { Country, CountryAddressSchema } from '@farfetch/blackout-client';

export type CountriesAddressSchemasEntity = Record<
  Country['code'],
  CountryAddressSchema[]
>;
