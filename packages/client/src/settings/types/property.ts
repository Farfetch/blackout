import type { Resource } from './resource';

export type Property = {
  code: string;
  description: string;
  value: string;
  schemaFieldType: string;
  security: {
    resources: Resource[];
    scopes: string[];
  };
};
