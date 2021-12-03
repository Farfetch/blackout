import type { Schema } from '@farfetch/blackout-client/addresses/types';

export type SchemaEntity = Schema;

export type AddressSchemaEntity = Record<string, Schema> | undefined;
