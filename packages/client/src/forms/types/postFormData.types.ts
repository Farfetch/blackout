import type { Config } from '../../types/index.js';
import type { SubmittedFormData } from './submittedFormData.types.js';

export type PostFormData = (
  schemaCode: string,
  data?: unknown,
  config?: Config,
) => Promise<SubmittedFormData>;
