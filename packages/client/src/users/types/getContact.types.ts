import type { Config } from '../../types';
import type { ContactResponse } from './contact.types';
import type { GetContactQuery } from './query.types';

export type GetContact = (
  id: number,
  contactId: string,
  query?: GetContactQuery,
  config?: Config,
) => Promise<ContactResponse>;
