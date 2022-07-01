import type { Config } from '../..';
import type { OrderDocuments } from './orderDocuments.types';

export type GetOrderDocuments = (
  id: string,
  types: string[],
  config?: Config,
) => Promise<OrderDocuments[]>;
