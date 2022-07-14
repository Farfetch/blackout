import type { Config } from '../../types';

export type AddressPrediction = {
  addressLine1: string;
  cityName: string;
  countryName: string;
  districtName: string;
  postalCode: string;
  provinceName: string;
  streetName: string;
};

export type GetAddressPredictionProps = {
  predictionId: string;
};
export type GetAddressPredictionQuery = {
  sessionToken: string;
};

export type GetAddressPrediction = (
  props: GetAddressPredictionProps,
  query?: GetAddressPredictionQuery,
  config?: Config,
) => Promise<AddressPrediction>;
