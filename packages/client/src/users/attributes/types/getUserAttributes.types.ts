import type { Config } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';
import type { UserAttribute } from './userAttribute.types.js';

export type GetUserAttributesQuery = {
  channelCode?: string;
  interface?: string;
};

export type GetUserAttributes = (
  userId: User['id'],
  query?: GetUserAttributesQuery,
  config?: Config,
) => Promise<UserAttribute[]>;
