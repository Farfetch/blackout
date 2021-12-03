import type { Config } from '../../types';
import type { User } from '.';

export type DeleteDefaultContactAddress = (
  userId: User['id'],
  config?: Config,
) => void;
