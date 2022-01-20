import type { Config } from '../../types';
import type { ContactResponse } from './contact.types';
import type { PatchContactQuery } from './query.types';

export type PatchContactData = {
  value: string;
  path: string;
  op: string;
  from: string;
};

export type PatchContact = (
  id: number,
  contactId: string,
  data: PatchContactData,
  query?: PatchContactQuery,
  config?: Config,
) => Promise<ContactResponse>;
