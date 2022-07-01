import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';

export type DeleteUserPersonalId = (
  userId: User['id'],
  personalId: string,
  config: Config,
) => Promise<number>;
