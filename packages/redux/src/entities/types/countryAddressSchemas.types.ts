import type { Country, CountryAddressSchema } from '@farfetch/blackout-client';

export type CountryAddressSchemasEntity = Record<
  Country['code'],
  CountryAddressSchema[]
>;
