import type { Config } from '../../../types';
import type { UserAttributesData } from './userAttributesData.types';
import type { UserAttributesResponse } from './userAttributesResponse.types';

export type PostUserAttributes = (
  id: number,
  data: UserAttributesData,
  config?: Config,
) => Promise<UserAttributesResponse>;
