export type FormSchema = {
  id: string;
  code: string;
  name: string;
  tenantId: number;
  schemaId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  jsonSchema: unknown;
  processors: unknown;
  settings: unknown;
  uiSchema: unknown;
};
