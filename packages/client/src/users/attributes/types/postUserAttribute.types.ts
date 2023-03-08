import type { Config } from '../../../types/index.js';
import type { UserAttributeData } from './userAttributeData.types.js';

export type PostUserAttribute = (
  userId: number,
  data: UserAttributeData,
  config?: Config,
) => Promise<void>;
