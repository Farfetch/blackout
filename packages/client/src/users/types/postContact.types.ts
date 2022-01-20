import type { Config } from '../../types';
import type { Contact, ContactResponse } from './contact.types';
import type { PostContactQuery } from './query.types';

export type PostContact = (
  id: number,
  data: Contact,
  query?: PostContactQuery,
  config?: Config,
) => Promise<ContactResponse>;
