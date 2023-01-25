import { Raffle, RaffleStatus } from '@farfetch/blackout-client';

export const raffleId = '3234f64-5717-4562-b3fc-2c963f66afa6';
export const mockRaffleResponse: Raffle = {
  id: '3234f64-5717-4562-b3fc-2c963f66afa6',
  status: RaffleStatus.Closed,
  title: 'string',
  productId: 0,
  merchantId: 0,
  startDate: '2023-01-12T11:43:12.999Z',
  endEntriesDate: '2023-01-12T11:43:12.999Z',
  drawDate: '2023-01-12T11:43:12.999Z',
  endDate: '2023-01-12T11:43:12.999Z',
};

export const mockFetchRaffleNormalizedPayload = {
  entities: {
    raffles: {
      [raffleId]: mockRaffleResponse,
    },
  },
  result: raffleId,
};
