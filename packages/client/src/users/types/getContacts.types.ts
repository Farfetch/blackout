import type { Config } from '../../types';
import type { ContactResponse } from './contact.types';
import type { GetContactsQuery } from './query.types';

export type GetContacts = (
  id: number,
  query?: GetContactsQuery,
  config?: Config,
) => Promise<ContactResponse>;
