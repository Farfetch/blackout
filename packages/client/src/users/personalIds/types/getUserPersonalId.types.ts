import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserPersonalId } from './userPersonalId.types.js';

export type GetUserPersonalId = (
  userId: User['id'],
  personalId: string,
  config: Config,
) => Promise<UserPersonalId>;
