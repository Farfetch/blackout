import {
  mockFetchRaffleParticipationsNormalizedPayload,
  participationId,
} from './raffleParticipation.fixtures';
import { mockRaffleEstimationNormalizedPayload } from './raffleEstimation.fixtures';
import { raffleId } from './raffle.fixtures';
import { Raffles, RaffleStatus } from '@farfetch/blackout-client';
import type { StoreState } from '@farfetch/blackout-redux';
export const mockRafflesResponse: Raffles = {
  entries: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: RaffleStatus.Draft,
      title: 'string',
      productId: 0,
      merchantId: 0,
      startDate: '2023-01-12T11:43:12.999Z',
      endEntriesDate: '2023-01-12T11:43:12.999Z',
      drawDate: '2023-01-12T11:43:12.999Z',
      endDate: '2023-01-12T11:43:12.999Z',
    },
    {
      id: '3234f64-5717-4562-b3fc-2c963f66afa6',
      status: RaffleStatus.Closed,
      title: 'string',
      productId: 0,
      merchantId: 0,
      startDate: '2023-01-12T11:43:12.999Z',
      endEntriesDate: '2023-01-12T11:43:12.999Z',
      drawDate: '2023-01-12T11:43:12.999Z',
      endDate: '2023-01-12T11:43:12.999Z',
    },
  ],
  nextToken: 'string',
};

export const mockFetchRafflesNormalizedPayload = {
  entities: {
    raffles: {
      '3fa85f64-5717-4562-b3fc-2c963f66afa6': {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        status: RaffleStatus.Draft,
        title: 'string',
        productId: 0,
        merchantId: 0,
        startDate: '2023-01-12T11:43:12.999Z',
        endEntriesDate: '2023-01-12T11:43:12.999Z',
        drawDate: '2023-01-12T11:43:12.999Z',
        endDate: '2023-01-12T11:43:12.999Z',
      },
      '3234f64-5717-4562-b3fc-2c963f66afa6': {
        id: '3234f64-5717-4562-b3fc-2c963f66afa6',
        status: RaffleStatus.Closed,
        title: 'string',
        productId: 0,
        merchantId: 0,
        startDate: '2023-01-12T11:43:12.999Z',
        endEntriesDate: '2023-01-12T11:43:12.999Z',
        drawDate: '2023-01-12T11:43:12.999Z',
        endDate: '2023-01-12T11:43:12.999Z',
      },
    },
  },
  result: {
    entries: [
      '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      '3234f64-5717-4562-b3fc-2c963f66afa6',
    ],
    nextToken: 'string',
  },
};
const raffleQuery = '?status=Closed';
export const mockRafflesState: StoreState = {
  entities: {
    ...mockFetchRafflesNormalizedPayload.entities,
    ...mockRaffleEstimationNormalizedPayload.entities,
    ...mockFetchRaffleParticipationsNormalizedPayload.entities,
  },
  raffles: {
    allRaffles: {
      [raffleQuery]: {
        result: { entries: [raffleId], nextToken: 'nextToken' },
        isLoading: false,
        error: null,
      },
    },
    raffles: {
      [raffleId]: {
        isLoading: false,
        error: null,
      },
    },
    estimations: {
      [raffleId]: {
        isLoading: false,
        error: null,
      },
    },
    participations: {
      [participationId]: {
        isLoading: false,
        error: null,
      },
    },
    participationCreations: {
      [raffleId]: {
        isLoading: false,
        error: null,
      },
    },
  },
};
