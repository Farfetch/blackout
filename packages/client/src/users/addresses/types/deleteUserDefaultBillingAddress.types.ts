import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type DeleteUserDefaultBillingAddress = (
  userId: User['id'],
  config?: Config,
) => Promise<number>;
