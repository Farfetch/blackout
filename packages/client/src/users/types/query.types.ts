import type { Contact } from './contact.types';

export type UserAttributesQuery = {
  channelCode?: string;
  interface?: string;
};

export type PostContactQuery = {
  id: number;
  body: Contact;
};

export type GetContactQuery = {
  id: number;
  contactId: string;
};

export type GetContactsQuery = {
  id: number;
  externalId?: string;
};

export type PatchContactQuery = {
  id: number;
  contactId: string;
  body: Contact;
};

export type DeleteContactQuery = {
  id: number;
  contactId: string;
};

export type GetTitlesQuery = {
  page?: number;
  pageSize?: number;
};

export type GetCreditMovementsQuery = {
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};
