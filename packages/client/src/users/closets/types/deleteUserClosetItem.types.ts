import type { Closet } from './closet.types.js';
import type { ClosetItem } from './closetItem.types.js';
import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type DeleteUserClosetItem = (
  userId: User['id'],
  closetId: Closet['id'],
  itemId: ClosetItem['id'],
  config?: Config,
) => Promise<number>;
