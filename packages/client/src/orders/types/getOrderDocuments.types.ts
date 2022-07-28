import type { Config } from '../..';
import type { OrderDocument } from './orderDocuments.types';

export type GetOrderDocuments = (
  id: string,
  types: string[],
  config?: Config,
) => Promise<OrderDocument[]>;
