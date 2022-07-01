import type { AddressPredictionDetails, Config } from '../../types';

export type GetAddressPredictionDetailsProps = {
  predictionId: string;
};
export type GetAddressPredictionDetailsQuery = {
  sessionToken: string;
};

export type GetAddressPredictionDetails = (
  props: GetAddressPredictionDetailsProps,
  query?: GetAddressPredictionDetailsQuery,
  config?: Config,
) => Promise<AddressPredictionDetails>;
