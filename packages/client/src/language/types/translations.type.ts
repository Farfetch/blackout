type entries = {
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

export type Translations = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: entries[];
};
