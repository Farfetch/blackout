import type { AddPatch, RemovePatch, ReplacePatch } from 'json-patch';
import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserContact } from './index.js';

export type PatchUserContactOperation = AddPatch | ReplacePatch | RemovePatch;

export type PatchUserContact = (
  userId: User['id'],
  contactId: string,
  data: PatchUserContactOperation[],
  config?: Config,
) => Promise<UserContact>;
