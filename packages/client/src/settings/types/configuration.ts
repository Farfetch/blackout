export enum ConfigurationSchemaFieldType {
  String = 0,
  Number = 1,
  Boolean = 2,
  Object = 4,
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
  security: ConfigurationSecurity | null;
  contextValues?: Array<{ code: string; value: string }>;
};

export type Configuration = {
  code: string;
  type: string;
  description: string;
  tenantId: number;
  properties: ConfigurationProperty[];
  channelCodes?: string[] | null;
};
