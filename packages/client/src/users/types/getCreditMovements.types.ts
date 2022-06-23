import type { Config } from '../../types';
import type { GetCreditMovementsQuery } from './query.types';

export type GetCreditMovementsResponse = {
  entries: {
    type: number;
    value: number;
    formattedValue: string;
    currency: string;
    description: string;
    createdOn: string;
  }[];
  number: number;
  totalItems: number;
  totalPages: number;
};

export type GetCreditMovements = (
  id: number,
  query: GetCreditMovementsQuery,
  config?: Config,
) => Promise<GetCreditMovementsResponse>;
