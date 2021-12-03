import type { Config } from '../../types';

export type PredictionDetails = {
  addressLine1: string;
  cityName: string;
  countryName: string;
  districtName: string;
  postalCode: string;
  provinceName: string;
  streetName: string;
};

export type GetPredictionDetailsProps = {
  predictionId: string;
};
export type GetPredictionDetailsQuery = {
  sessionToken: string;
};

export type GetPredictionDetails = (
  props: GetPredictionDetailsProps,
  query?: GetPredictionDetailsQuery,
  config?: Config,
) => Promise<PredictionDetails>;
