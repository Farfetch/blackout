import type { Config } from '../../types';

export type AddressPredictions = {
  description: string;
  id: string;
  text: string;
  type: string;
};

export type GetAddressPredictionsQuery = {
  sessionToken?: string;
  countries?: string;
  sampleSize?: number;
};

export type GetAddressPredictions = (
  text: string,
  query?: GetAddressPredictionsQuery,
  config?: Config,
) => Promise<AddressPredictions[]>;
