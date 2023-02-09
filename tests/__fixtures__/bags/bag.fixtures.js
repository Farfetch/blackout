import { mockBagItemEntity, mockBagItemId } from './bagItem.fixtures';
import { mockBagOperation, mockBagOperationId } from './bagOperations.fixtures';
import {
  mockProduct,
  mockProductId,
  mockProductTypeToExclude,
} from '../products';
import { mockPromotionEvaluationId } from '../promotionEvaluations';

export const mockBagId = '7894746';
export const mockError = 'Unexpected Error';
export const mockBagPromocodesData = {
  promocodes: ['code-1'],
};
export const mockBagPromocodesResponse = {
  promoCodesInformation: [
    {
      promoCode: 'code-1',
      isValid: true,
    },
  ],
};

export const mockData = {
  merchant: { id: 1 },
  product: { id: 1 },
  size: { id: 1 },
  scale: '1',
  quantity: 1,
};

export const mockBagEntity = {
  id: mockBagId,
  items: [mockBagItemId, 101, 102, 103, 104],
  bagOperations: [mockBagOperationId, 101, 102, 103, 104],
  '@controls': {
    BagGet_operation: {
      href: `/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
    },
  },
};

export const mockInitialState = {
  bag: {
    error: null,
    id: mockBagId,
    isLoading: false,
    bagItems: {
      error: {},
      isLoading: {},
    },
    bagOperations: {
      error: {},
      isLoading: {},
    },
    bagPromocodes: {
      error: null,
      isLoading: false,
    },
  },
  entities: {
    bag: {},
  },
};

export const mockLoadingState = {
  bag: {
    error: null,
    id: mockBagId,
    isLoading: false,
    bagItems: {
      error: {},
      isLoading: {
        [mockBagItemId]: true,
      },
    },
    bagOperations: {
      error: {},
      isLoading: {
        [mockBagOperationId]: true,
      },
    },
    bagPromocodes: {
      error: null,
      isLoading: true,
    },
  },
  entities: {
    bag: {},
  },
};

export const mockErrorState = {
  bag: {
    error: null,
    id: mockBagId,
    isLoading: false,
    bagItems: {
      error: {
        [mockBagItemId]: { message: 'An unexpected error occurred' },
      },
      isLoading: {
        [mockBagItemId]: false,
      },
    },
    bagOperations: {
      error: {
        [mockBagOperationId]: { message: 'An unexpected error occurred' },
      },
      isLoading: {
        [mockBagOperationId]: false,
      },
    },
    bagPromocodes: {
      error: { message: 'An unexpected error occurred' },
      isLoading: false,
    },
  },
  entities: {
    bag: {},
  },
};

export const mockState = {
  bag: {
    error: mockError,
    id: mockBagId,
    isLoading: false,
    bagItems: {
      isLoading: {
        [mockBagItemId]: true,
      },
      error: {
        [mockBagItemId]: { message: 'error: not loaded' },
      },
    },
    bagOperations: {
      isLoading: {},
      error: {},
    },
    bagPromocodes: {
      isLoading: false,
      error: null,
    },
  },
  entities: {
    bag: { [mockBagId]: mockBagEntity },
    bagItems: {
      [mockBagItemId]: mockBagItemEntity,
      101: {
        ...mockBagItemEntity,
        id: 101,
        customAttributes: null,
        productAggregator: null,
      },
      102: {
        id: 102,
        product: 1002,
        merchant: 1223,
        quantity: 2,
        size: {
          id: 1,
          name: '1',
          scale: 'IT',
        },
        isAvailable: true,
      },
      103: {
        id: 103,
        product: mockProductId,
        quantity: 48,
        merchant: 1223,
        size: {
          id: 22,
          name: '10',
          scale: 'IT',
        },
        isAvailable: true,
      },
      104: {
        id: 104,
        product: mockProductId,
        quantity: 5,
        merchant: 1223,
        size: {
          id: 23,
          name: '10',
          scale: 'IT',
        },
        isAvailable: true,
      },
    },
    products: {
      [mockProductId]: mockProduct,
      1002: {
        id: 1002,
        description: 'bar product',
        type: mockProductTypeToExclude,
        sizes: [
          {
            id: 22,
            name: '10',
          },
        ],
      },
    },
    bagOperations: {
      [mockBagOperationId]: mockBagOperation,
      101: {
        ...mockBagOperation,
        id: '101',
      },
    },
    bagPromocodesInformation: {
      [mockBagId]: mockBagPromocodesResponse.promoCodesInformation,
    },
  },
};
export const mockResponse = {
  id: mockBagId,
  items: [
    {
      attributes: [{ type: '1', value: 'M' }],
      brandId: 'RL',
      brandName: 'Ralph Lauren',
      dateCreated: '/Date(12345)/',
      id: mockBagItemId,
      images: {},
      labels: [],
      merchantId: 12424,
      merchantName: 'STORE OF THE FUTURE LISBON BOUTIQUE',
      merchantShoppingUrl: null,
      price: {
        discountExclTaxes: 0,
        discountInclTaxes: 0,
        discountRate: 0,
        formattedPrice: '$265,597.00',
        formattedPriceWithoutCurrency: '265597.00',
        formattedPriceWithoutDiscount: '$265,597.00',
        formattedPriceWithoutDiscountAndCurrency: '265597.00',
        priceExclTaxes: 185442.9802,
        priceInclTaxes: 265596.9995,
        priceInclTaxesWithoutDiscount: 265596.9995,
        tags: ['DDP'],
        taxType: 'DDP',
        taxesRate: 43.223,
        taxesValue: 80154.0193,
      },
      productDescription: 'Classic oxford shirt',
      productId: mockProductId,
      productName: 'Oxford Shirt',
      type: 0,
      promotionEvaluationId: mockPromotionEvaluationId,
      '@controls': {
        BagGet_operation: {
          href: `/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
        },
      },
    },
  ],
};
export const mockNormalizedPayload = {
  entities: {
    bag: { [mockBagId]: { id: mockBagId, items: [mockBagItemId] } },
    bagItems: {
      [mockBagItemId]: { id: mockBagItemId, product: mockProductId },
    },
    products: { [mockProductId]: { id: mockProductId } },
  },
  result: mockBagId,
};
