import type { Config } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';
import type { UserAttribute } from './userAttribute.types';

export type GetUserAttribute = (
  userId: User['id'],
  attributeId: string,
  config?: Config,
) => Promise<UserAttribute>;
