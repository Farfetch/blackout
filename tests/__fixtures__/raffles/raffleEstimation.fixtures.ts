import { raffleId } from './raffle.fixtures';
import type { RaffleEstimation } from '@farfetch/blackout-client';

export const mockRaffleEstimationResponse: RaffleEstimation = {
  currencyCode: 'string',
  estimatedPrice: 22,
  estimatedShippingPrice: 32,
};

export const mockRaffleEstimationNormalizedPayload = {
  entities: {
    raffleEstimations: {
      [raffleId]: mockRaffleEstimationResponse,
    },
  },
  result: raffleId,
};
