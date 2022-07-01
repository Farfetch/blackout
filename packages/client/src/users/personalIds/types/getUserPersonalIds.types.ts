import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserPersonalId } from './userPersonalId.types';

export type GetUserPersonalIds = (
  userId: User['id'],
  config: Config,
) => Promise<UserPersonalId[]>;
