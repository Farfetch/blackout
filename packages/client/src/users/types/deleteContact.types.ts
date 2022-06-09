import type { Config } from '../../types';
import type { DeleteContactQuery } from './query.types';

export type DeleteContact = (
  id: number,
  contactId: string,
  query?: DeleteContactQuery,
  config?: Config,
) => void;
