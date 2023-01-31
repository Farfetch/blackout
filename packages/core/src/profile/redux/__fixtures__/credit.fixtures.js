export const mockGetCreditResponse = [
  {
    currency: 'GB',
    value: 50,
    formattedValue: '£50',
  },
];

export const expectedCreditNormalizedPayload = {
  credit: {
    ...mockGetCreditResponse[0],
  },
};
