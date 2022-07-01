import type { Config } from '../..';

export type GetOrderDocument = (
  id: string,
  documentId: string,
  config?: Config,
) => Promise<string>;
