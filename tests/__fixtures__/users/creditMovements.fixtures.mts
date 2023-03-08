export const mockGetCreditMovementsResponse = {
  entries: [
    {
      type: 1,
      value: 0.57,
      formattedValue: '$0.57',
      currency: 'USD',
      description: 'Other Reason (FF fault)',
      createdOn: '/Date(1581071861195)/',
    },
    {
      type: 1,
      value: 13.97,
      formattedValue: '$13.97',
      currency: 'USD',
      description: 'Other Reason (FF fault)',
      createdOn: '/Date(1579793016416)/',
    },
    {
      type: 2,
      value: 13.97,
      formattedValue: '$13.97',
      currency: 'USD',
      description: 'EUR 12.56 credit was Used - Order W95FWA',
      createdOn: '/Date(1579792756504)/',
    },
  ],
  number: 1,
  totalItems: 3,
  totalPages: 1,
};

export const expectedCreditMovementsNormalizedPayload = {
  creditMovements: {
    ...mockGetCreditMovementsResponse,
  },
};
