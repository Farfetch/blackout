import type { Config } from '../../types';
import type { SubmitFormSchema } from './submitFormSchema.types';

export type PostFormSchema = (
  schemaCode: string,
  data?: unknown,
  config?: Config,
) => Promise<SubmitFormSchema>;
