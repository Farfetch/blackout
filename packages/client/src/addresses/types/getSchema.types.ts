import type { Config } from '../../types';

export type AddressSchemaLine = {
  apiMapping: string;
  column: number;
  isMandatory: boolean;
  maxLength: number;
  minLength: number;
  name: string;
  position: number;
  row: number;
  type: string;
  validationRegex: string;
};

export type Schema = {
  addressSchemaLines: AddressSchemaLine[];
};

export type GetSchema = (isoCode: string, config?: Config) => Promise<Schema>;
