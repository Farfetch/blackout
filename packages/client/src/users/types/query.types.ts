import type { UserContact } from '../contacts/types/userContact.types';
export interface UserAttributesQuery {
  channelCode?: string;
  interface?: string;
}

export interface PostUserContactQuery {
  id: number;
  body: UserContact;
}

export interface GetUserContactQuery {
  id: number;
  contactId: string;
}

export interface GetUserContactsQuery {
  id: number;
  externalId?: string;
}

export interface PatchUserContactQuery {
  id: number;
  contactId: string;
  body: UserContact;
}

export interface DeleteUserContactQuery {
  id: number;
  contactId: string;
}

export type GetTitlesQuery = {
  page?: number;
  pageSize?: number;
};

export interface GetUserCreditMovementsQuery {
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}
