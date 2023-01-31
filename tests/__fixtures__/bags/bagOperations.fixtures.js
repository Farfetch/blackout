export const mockBagOperationId = '134';

export const mockBagOperation = {
  id: mockBagOperationId,
  createdDate: '2023-01-19T15:46:00.223Z',
  changes: [
    {
      changeType: 'ItemIsUnavailable',
      productId: 0,
      variantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      itemId: 0,
      oldPrice: {
        priceInclTaxes: 0,
      },
      newPrice: {
        priceInclTaxes: 0,
      },
      oldValue: 'string',
      newValue: 'string',
      currency: 'string',
      reason: 'LackOfBenefits',
    },
  ],
  violations: [
    {
      itemsIds: [0],
      fixSuggestion: {
        action: 'DecreaseQuantity',
        value: 'string',
      },
    },
  ],
};

export const mockBagOperations = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [mockBagOperation],
};

export const mockBagOperationsNormalizedPayload = {
  bagOperationId: mockBagOperationId,
  entities: {
    bagOperations: { [mockBagOperationId]: mockBagOperation },
  },
  result: mockBagOperationId,
};
