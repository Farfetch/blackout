import type { Config } from '../../../types';
import type { UserAttributesData } from '.';

export type PutUserAttribute = (
  id: number,
  attributeId: string,
  data: UserAttributesData,
  config?: Config,
) => Promise<number>;
