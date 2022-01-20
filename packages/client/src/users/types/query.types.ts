import type { Contact } from './contact.types';
export interface UserAttributesQuery {
  channelCode?: string;
  interface?: string;
}

export interface PostContactQuery {
  id: number;
  body: Contact;
}

export interface GetContactQuery {
  id: number;
  contactId: string;
}

export interface GetContactsQuery {
  id: number;
  externalId?: string;
}

export interface PatchContactQuery {
  id: number;
  contactId: string;
  body: Contact;
}

export interface DeleteContactQuery {
  id: number;
  contactId: string;
}

export interface GetTitlesQuery {
  page: number;
  pageSize: number;
}
