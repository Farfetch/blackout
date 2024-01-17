import { toBlackoutError } from '@farfetch/blackout-client';

export const creditId = 123456;

export const mockGetCreditResponse = [
  {
    currency: 'GB',
    value: 50,
    formattedValue: '£50',
  },
];

export const expectedCreditNormalizedPayload = {
  credits: mockGetCreditResponse,
};

export const creditMovementsQuery = {
  from: 'from',
  to: 'to',
  page: 1,
  pageSize: 20,
};

export const mockStateCredits = {
  credits: {
    error: toBlackoutError(new Error('error')),
    isLoading: false,
  },
};
