import type { Config } from '../../types';
import type { FormSchema } from './formSchema.types';
import type { FormSchemaQuery } from './formSchemaQuery.types';

export type GetFormSchema = (
  schemaCode: string,
  query?: FormSchemaQuery,
  config?: Config,
) => Promise<FormSchema>;
