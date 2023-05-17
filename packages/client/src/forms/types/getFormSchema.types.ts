import type { Config } from '../../types/index.js';
import type { FormSchema } from './formSchema.types.js';
import type { FormSchemaQuery } from './formSchemaQuery.types.js';

export type GetFormSchema = (
  schemaCode: string,
  query?: FormSchemaQuery,
  config?: Config,
) => Promise<FormSchema>;
