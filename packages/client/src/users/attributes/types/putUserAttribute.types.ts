import type { Config } from '../../../types/index.js';
import type { UserAttributeData } from './index.js';

export type PutUserAttribute = (
  id: number,
  attributeId: string,
  data: UserAttributeData,
  config?: Config,
) => Promise<number>;
