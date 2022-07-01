import type { Config } from '../../../types';
import type { UserAttributeData } from '.';

export type PutUserAttribute = (
  id: number,
  attributeId: string,
  data: UserAttributeData,
  config?: Config,
) => Promise<number>;
