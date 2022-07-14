import type { CountryAddressSchema } from '@farfetch/blackout-client/src/locale/types';

export type SchemaEntity = CountryAddressSchema;

export type AddressSchemaEntity =
  | Record<string, CountryAddressSchema>
  | undefined;
