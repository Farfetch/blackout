import type { Config } from '../../types';

export type PostOrderDocument = (
  id: string,
  documentId: string,
  data: DocumentData,
  config?: Config,
) => Promise<string>;

export type DocumentData = {
  action: string;
  documentTypes: string[];
};
