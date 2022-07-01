import type { Config } from '../../../types';
import type { UserAttributeData } from './userAttributeData.types';

export type PostUserAttribute = (
  userId: number,
  data: UserAttributeData,
  config?: Config,
) => Promise<void>;
