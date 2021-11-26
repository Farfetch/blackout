import type { Property } from './property';

export type Configuration = {
  code: string;
  type: string;
  description: string;
  tenant: number;
  properties: Property[];
};
