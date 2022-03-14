import type { AddressSchemaLine } from '.';
import type { Config } from '../../types';

export type Schema = {
  addressSchemaLines: AddressSchemaLine[];
  addressType: string;
}[];

export type GetSchema = (isoCode: string, config?: Config) => Promise<Schema>;
