import type { Config } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type DeleteUserAttribute = (
  userId: User['id'],
  attributeId: string,
  config?: Config,
) => Promise<number>;
