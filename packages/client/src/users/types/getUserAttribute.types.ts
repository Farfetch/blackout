import { Config } from '../../types';
import type { UserAttributesResponse } from './userAttributesResponse.types';

export type GetUserAttribute = (
  id: number,
  attributeId: string,
  config?: Config,
) => Promise<UserAttributesResponse>;
