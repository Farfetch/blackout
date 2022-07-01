import type { Config } from '../../../types';
import type { GetUserCreditMovementsQuery } from '../../types/query.types';

export type GetUserCreditMovementsResponse = {
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

export type GetUserCreditMovements = (
  id: string,
  query: GetUserCreditMovementsQuery,
  config?: Config,
) => Promise<GetUserCreditMovementsResponse>;

export type GetUserCreditMovementsFixtureParams = {
  id: string;
  query?: GetUserCreditMovementsQuery;
  config?: Config;
  response?: GetUserCreditMovementsFixtureParams | Record<string, unknown>;
};
