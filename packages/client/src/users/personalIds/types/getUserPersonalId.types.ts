import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserPersonalId } from './userPersonalId.types';

export type GetUserPersonalId = (
  userId: User['id'],
  personalId: string,
  config: Config,
) => Promise<UserPersonalId>;
