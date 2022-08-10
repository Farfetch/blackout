import type { Config } from '../../types';
import type { SubmittedFormData } from './submittedFormData.types';

export type PostFormData = (
  schemaCode: string,
  data?: unknown,
  config?: Config,
) => Promise<SubmittedFormData>;
