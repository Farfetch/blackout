import type { AddressType, Config } from '../../types';

export type CountryAddressSchemaLine = {
  apiMapping: string;
  column: number;
  id: string;
  isMandatory: boolean;
  maxLength: number;
  minLength: number;
  name: string;
  parentId: string;
  position: number;
  row: number;
  type: string;
  validationRegex: string;
};

export type CountryAddressSchema = {
  addressSchemaLines: CountryAddressSchemaLine[];
  addressType: AddressType;
};

export type GetCountryAddressSchemas = (
  isoCode: string,
  config?: Config,
) => Promise<CountryAddressSchema[]>;
