import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type DeleteUserPersonalId = (
  userId: User['id'],
  personalId: string,
  config: Config,
) => Promise<number>;
