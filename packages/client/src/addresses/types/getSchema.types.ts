import type { Config } from '../../types';

export type AddressSchemaLine = {
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

export type Schema = {
  addressSchemaLines: AddressSchemaLine[];
  addressType: string;
};

export type GetSchema = (isoCode: string, config?: Config) => Promise<Schema>;
