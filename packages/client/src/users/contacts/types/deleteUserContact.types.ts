import type { Config } from '../../../types';

export type DeleteUserContact = (
  userId: number,
  contactId: string,
  config?: Config,
) => Promise<number>;
