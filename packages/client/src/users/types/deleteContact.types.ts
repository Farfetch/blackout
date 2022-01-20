import type { Config } from '../../types';
import type { ContactResponse } from './contact.types';
import type { DeleteContactQuery } from './query.types';

export type DeleteContact = (
  id: number,
  contactId: string,
  query?: DeleteContactQuery,
  config?: Config,
) => Promise<ContactResponse>;
