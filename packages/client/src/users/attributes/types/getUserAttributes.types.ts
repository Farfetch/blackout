import type { Config } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';
import type { UserAttribute } from './userAttribute.types';

export type GetUserAttributesQuery = {
  channelCode?: string;
  interface?: string;
};

export type GetUserAttributes = (
  userId: User['id'],
  query?: GetUserAttributesQuery,
  config?: Config,
) => Promise<UserAttribute[]>;
