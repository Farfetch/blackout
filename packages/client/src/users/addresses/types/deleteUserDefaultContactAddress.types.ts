import type { Config } from '../../../types';
import type { User } from '.';

export type DeleteUserDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => void;
