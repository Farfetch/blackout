export enum ConfigurationSchemaFieldType {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
  Object = 'object',
}

export type ConfigurationSecurity = {
  resources: Array<{
    name: string;
    action: string;
  }>;
  scopes: string[];
};

export type ConfigurationProperty = {
  code: string;
  description: string;
  value: string;
  schemaFieldType: ConfigurationSchemaFieldType;
  security: ConfigurationSecurity;
  contextValues?: Array<{ code: string; value: string }>;
};

export type Configuration = {
  code: string;
  type: string;
  description: string;
  tenantId: number;
  properties: ConfigurationProperty[];
  channelCodes?: string[];
};
