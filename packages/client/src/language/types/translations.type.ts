import type { PagedResponse } from '../../types';

export type Translation = {
  tenantId: number;
  clientId: number;
  projectExternalId: string;
  subProjectExternalId: string;
  key: string;
  language: string;
  text: string;
  createdDate: string;
  updatedDate: string;
  status: string;
};

export type Translations = PagedResponse<Translation>;
