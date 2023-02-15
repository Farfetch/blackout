import type { AddPatch, RemovePatch, ReplacePatch } from 'json-patch';
import type { Config } from '../../../types';
import type { User } from '../../authentication/types/user.types';
import type { UserContact } from '.';

export type PatchUserContactOperation = AddPatch | ReplacePatch | RemovePatch;

export type PatchUserContact = (
  userId: User['id'],
  contactId: string,
  data: PatchUserContactOperation[],
  config?: Config,
) => Promise<UserContact>;
