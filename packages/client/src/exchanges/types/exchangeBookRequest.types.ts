import type { ExchangeReturnItem } from './exchange.types.js';
import type { Return } from '../../returns/index.js';

export type ExchangeBookRequest = {
  id: string;
  status: ExchangeBookRequestStatus;
  faults: Array<ExchangeBookRequestFault> | null;
  exchangeReturnAssociations: Array<ExchangeReturnAssociation>;
};

export type ExchangeReturnAssociation = {
  exchangeReturnItemId: ExchangeReturnItem['id'];
  returnId: Return['id'];
};

export enum ExchangeBookRequestStatus {
  None = 'None',
  Error = 'Error',
  Success = 'Success',
}

export type ExchangeBookRequestFault = {
  code: string;
  message: string;
};
