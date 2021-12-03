import type { Config } from '../../types';

export type Prediction = {
  description: string;
  id: string;
  text: string;
  type: string;
};

export type GetPredictionsQuery = {
  sessionToken?: string;
  countries?: string;
  sampleSize?: number;
};

export type GetPredictions = (
  text: string,
  query?: GetPredictionsQuery,
  config?: Config,
) => Promise<Prediction[]>;
