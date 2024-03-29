import {
  type BagOperation,
  BagOperationChangeReason,
  BagOperationChangeType,
  BagViolationFixSuggestionType,
} from '@farfetch/blackout-client';

export const mockBagOperationId = '134';

export const mockBagOperation: BagOperation = {
  id: mockBagOperationId,
  createdDate: '2023-01-19T15:46:00.223Z',
  changes: [
    {
      changeType: BagOperationChangeType.ItemIsUnavailable,
      productId: 0,
      variantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      reason: BagOperationChangeReason.LackOfBenefits,
    },
  ],
  violations: [
    {
      itemsIds: [0],
      fixSuggestion: {
        action: BagViolationFixSuggestionType.DecreaseQuantity,
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
  entities: {
    bagOperations: { [mockBagOperationId]: mockBagOperation },
  },
  result: mockBagOperationId,
};
