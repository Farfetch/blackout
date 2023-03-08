import type { PagedResponse } from '../../types/index.js';

export type Translation = {
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
