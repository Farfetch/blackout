import { raffleId } from './raffle.fixtures';
import {
  type RaffleParticipation,
  RaffleParticipationStatus,
} from '@farfetch/blackout-client';

export const participationId = '1234---3fa85f64-5717-4562-b3fc-2c963f66afa6';

export const mockRaffleParticipationResponse: RaffleParticipation = {
  userId: 'string',
  raffleId: raffleId,
  id: participationId,
  estimation: {
    currencyCode: 'string',
    estimatedPrice: 0,
    estimatedShippingPrice: 0,
  },
  status: RaffleParticipationStatus.Participated,
  billingAddressId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  shippingAddressId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  productVariantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  paymentTokenId: 'string',
  trackingCorrelationId: 'string',
};

export const mockFetchRaffleParticipationsNormalizedPayload = {
  entities: {
    raffleParticipations: {
      [participationId]: mockRaffleParticipationResponse,
    },
  },
  result: participationId,
};

export const mockCreateRaffleParticipationsNormalizedPayload = {
  entities: {
    raffleParticipations: {
      [participationId]: mockRaffleParticipationResponse,
    },
  },
  result: participationId,
};
