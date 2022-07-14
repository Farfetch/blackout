import type { Config } from '../../types';

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
  addressType: string;
};

export type GetCountryAddressSchema = (
  isoCode: string,
  config?: Config,
) => Promise<CountryAddressSchema>;
