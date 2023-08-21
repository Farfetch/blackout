import type { Closet } from './closet.types.js';
import type { Config, User } from '../../../index.js';

export type GetUserClosets = (
  userId: User['id'],
  config?: Config,
) => Promise<Closet[]>;
