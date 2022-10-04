export enum SchemaFieldType {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
  Object = 'object',
  PreOwned = 'PreOwned',
}

export type Configuration = {
  code: string;
  type: string;
  description: string;
  tenant: number;
  properties: Array<{
    code: string;
    description: string;
    value: string;
    schemaFieldType: SchemaFieldType;
    security: {
      resources: Array<{
        name: string;
        action: string;
      }>;
      scopes: string[];
    };
  }>;
};
