import type { Config } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';
import type { UserAttribute } from './userAttribute.types.js';

export type GetUserAttribute = (
  userId: User['id'],
  attributeId: string,
  config?: Config,
) => Promise<UserAttribute>;
