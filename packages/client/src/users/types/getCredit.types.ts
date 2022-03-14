import type { Config } from '../../types';

export type GetCreditResponse = [
  {
    currency: string;
    value: number;
    formattedValue: string;
  },
];

export type GetCredit = (
  id: number,
  config?: Config,
) => Promise<GetCreditResponse>;
