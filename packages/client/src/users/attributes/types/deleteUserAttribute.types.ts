import type { Config } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

export type DeleteUserAttribute = (
  userId: User['id'],
  attributeId: string,
  config?: Config,
) => Promise<number>;
