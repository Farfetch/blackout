export type GetTranslationsQuery = {
  keys?: string[];
  projectExternalId: string;
  subProjectExternalId: string;
  languages?: string[];
  text?: string;
  createdDate?: string;
  updatedDate?: string;
  page?: number;
  pageSize?: number;
};
