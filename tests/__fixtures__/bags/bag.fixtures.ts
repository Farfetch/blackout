import {
  AttributeType,
  BlackoutError,
  PurchaseChannel,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { mockBagItemEntity, mockBagItemId } from './bagItem.fixtures';
import { mockBagOperation, mockBagOperationId } from './bagOperations.fixtures';
import {
  mockBrandId,
  mockProductEntity,
  mockProductId,
  mockProductSizeAdapted,
  mockProductSizes,
  mockProductTypeToExclude,
} from '../products';
import { mockCategoryId } from '../categories';
import type {
  BrandEntity,
  CategoryEntity,
  SizeAdapted,
} from '@farfetch/blackout-redux';

export const mockBagId = '7894746';
export const mockError = {
  message: 'Unexpected Error',
};

const mockCategoryEntity: CategoryEntity = {
  id: mockCategoryId,
  name: 'dress',
  gender: 0,
  parentId: 0,
};

const mockBrandEntity: BrandEntity = {
  id: mockBrandId,
  description: 'Gucci',
  name: 'Gucci',
};

export const mockBagItemData = {
  productId: 1,
  size: 2,
  scale: 3,
  merchantId: 4,
  quantity: 99,
};

export const mockBagPromocodesResponse = {
  promoCodesInformation: [
    {
      promoCode: 'code-1',
      isValid: true,
    },
  ],
};

export const mockBagPromocodesData = {
  promocodes: ['code-1'],
};

export const mockInitialState = {
  bag: {
    error: null,
    id: mockBagId,
    isLoading: false,
    items: {
      ids: [],
      item: {
        error: {},
        isLoading: {},
      },
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
};

export const mockLoadingState = {
  bag: {
    error: null,
    id: mockBagId,
    isLoading: false,
    items: {
      ids: [],
      item: {
        error: {},
        isLoading: {
          [mockBagItemId]: true,
        },
      },
    },
    bagOperations: {
      error: {},
      isLoading: {
        [mockBagOperationId]: true,
      },
    },
  },
};

export const mockErrorState = {
  bag: {
    error: mockError,
    id: mockBagId,
    isLoading: false,
    items: {
      ids: [],
      item: {
        error: {
          [mockBagItemId]: new Error(
            'An unexpected error occurred',
          ) as BlackoutError,
        },
        isLoading: {
          [mockBagItemId]: false,
        },
      },
    },
    bagOperations: {
      error: {
        [mockBagOperationId]: new Error(
          'An unexpected error occurred',
        ) as BlackoutError,
      },
      isLoading: {
        [mockBagOperationId]: false,
      },
    },
  },
};

export const mockState = {
  bag: {
    error: null,
    id: mockBagId,
    isLoading: false,
    result: {
      id: mockBagId,
      bagSummary: {
        currency: 'USD',
        currencySymbol: '$',
        dateCreated: '/Date(1534759345364)/',
        dateUpdated: '/Date(1562573175001)/',
        grandTotal: 381.62,
        subTotalAmount: 371.62,
        subTotalAmountExclTaxes: 371.62,
        totalDiscount: 0,
        totalShippingFee: 10,
        totalTaxes: 0,
        formattedGrandTotal: '$381.62',
        formattedSubTotalAmount: '$371.62',
        formattedSubTotalAmountExclTaxes: '$371.62',
        formattedTotalDiscount: '$0',
        formattedTotalShippingFee: '$10',
        formattedTotalTaxes: '$0',
        taxType: 'DDP',
        totalProductPromotionDiscount: 0,
        formattedTotalProductPromotionDiscount: '$0',
      },
      count: 7,
      items: [mockBagItemId, 101, 102, 103, 104],
      hadUnavailableItems: false,
      '@controls': {
        BagGet_operation: {
          href: `/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
        },
      },
    },
    items: {
      ids: [mockBagItemId, 101, 102, 103, 104],
      item: {
        isLoading: {
          [mockBagItemId]: true,
        },
        error: {
          [mockBagItemId]: toBlackoutError(new Error('error: not loaded')),
        },
      },
    },
    bagOperations: {
      isLoading: {
        [mockBagOperationId]: true,
      },
      error: {
        [mockBagOperationId]: toBlackoutError(new Error('unexpected error')),
      },
    },
    bagPromocodes: {
      error: toBlackoutError(new Error('unexpected error')),
      isLoading: false,
    },
  },
  entities: {
    bagItems: {
      [mockBagItemId]: mockBagItemEntity,
      101: {
        ...mockBagItemEntity,
        id: 101,
        customAttributes: null,
        productAggregator: null,
      },
      102: {
        ...mockBagItemEntity,
        id: 102,
        product: 1002,
        merchant: 1223,
        quantity: 2,
        isAvailable: true,
      },
      103: {
        ...mockBagItemEntity,
        id: 103,
        product: mockProductId,
        quantity: 48,
        merchant: 1223,
        size: {
          id: 23,
          name: '10',
          scale: 206,
          globalQuantity: 2,
          isOneSize: false,
          isOutOfStock: false,
          scaleAbbreviation: 'IT',
          scaleDescription: undefined,
          stock: [],
        },
        isAvailable: true,
      },
      104: {
        ...mockBagItemEntity,
        id: 104,
        product: mockProductId,
        quantity: 5,
        merchant: 1223,
        isAvailable: true,
      },
    },
    brands: {
      [mockBrandId]: mockBrandEntity,
    },
    categories: {
      [mockCategoryId]: mockCategoryEntity,
    },
    products: {
      [mockProductId]: mockProductEntity,
      1002: {
        ...mockProductEntity,
        id: 1002,
        description: 'bar product',
        type: mockProductTypeToExclude,
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
  count: 1,
  hadUnavailableItems: false,
  items: [
    {
      attributes: [
        {
          type: AttributeType.SizeDescription,
          value: 'M',
          description: 'Size',
        },
      ],
      brandId: 25354,
      brandName: 'Ralph Lauren',
      categories: [
        {
          gender: 0,
          id: 136301,
          name: 'Shoes',
          parentId: 0,
        },
        {
          gender: 0,
          id: 136308,
          name: 'Sandals',
          parentId: 136301,
        },
      ],
      colors: [
        {
          color: {
            id: 112495,
            name: 'Black',
          },
          tags: ['MainColor'],
        },
        {
          color: {
            id: 0,
            name: 'BLACK',
          },
          tags: ['DesignerColor'],
        },
      ],
      customAttributes: '',
      dateCreated: '/Date(12345)/',
      fulfillmentInfo: {
        fulfillmentDate: null,
        isPreOrder: false,
      },
      gender: 1,
      id: mockBagItemId,
      images: {
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
          },
        ],
        liveModel: null,
        liveModelId: 0,
        productSize: '1',
        tag: null,
      },
      isCustomizable: false,
      isExclusive: false,
      labels: [],
      merchantId: 12424,
      merchantName: 'STORE OF THE FUTURE LISBON BOUTIQUE',
      variants: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          attributes: [
            {
              type: AttributeType.Size,
              value: 'string',
              description: 'string',
            },
          ],
          availableAt: [0],
          merchantId: 0,
          price: {
            priceExclTaxes: 0,
            priceInclTaxes: 0,
            priceInclTaxesWithoutDiscount: 0,
            discountExclTaxes: 0,
            discountInclTaxes: 0,
            discountRate: 0,
            taxesRate: 0,
            taxesValue: 0,
            tags: ['string'],
            formattedPrice: 'string',
            formattedPriceWithoutDiscount: 'string',
            formattedPriceWithoutCurrency: 'string',
            formattedPriceWithoutDiscountAndCurrency: 'string',
            taxType: 'string',
          },
          formattedPrice: 'string',
          formattedPriceWithoutDiscount: 'string',
          purchaseChannel: PurchaseChannel.AddToBag,
          quantity: 0,
          size: 'string',
          scale: 'string',
          scaleAbbreviation: 'string',
          sizeDescription: 'string',
          isOneSize: true,
        },
      ],
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
      productAggregator: null,
      productDescription: 'Classic oxford shirt',
      productId: mockProductId,
      productName: 'Oxford Shirt',
      productSlug: 'oxford-shirt-11766695',
      promotionDetail: {
        formattedTotalDiscountValue: '0 €',
        isProductOffer: false,
        promotionEvaluationItemId: null,
        totalDiscountPercentage: null,
        totalDiscountValue: 0,
      },
      type: 0,
      quantity: 1,
      isAvailable: true,
      sizes: mockProductSizes,
    },
  ],
  bagSummary: {
    currency: 'USD',
    currencySymbol: '$',
    dateCreated: '/Date(1534759345364)/',
    dateUpdated: '/Date(1562573175001)/',
    grandTotal: 381.62,
    subTotalAmount: 371.62,
    subTotalAmountExclTaxes: 371.62,
    totalDiscount: 0,
    totalShippingFee: 10,
    totalTaxes: 0,
    formattedGrandTotal: '$381.62',
    formattedSubTotalAmount: '$371.62',
    formattedSubTotalAmountExclTaxes: '$371.62',
    formattedTotalDiscount: '$0',
    formattedTotalShippingFee: '$10',
    formattedTotalTaxes: '$0',
    taxType: 'DDP',
    formattedTotalProductPromotionDiscount: '$0',
    totalProductPromotionDiscount: 0,
  },
  '@controls': {
    BagGet_operation: {
      href: `/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
    },
  },
};

export const mockNormalizedPayload = {
  entities: {
    bagItems: {
      [mockBagItemId]: { id: mockBagItemId, product: mockProductId },
    },
    products: { [mockProductId]: { id: mockProductId } },
  },
  result: { items: [mockBagItemId] },
};

export const mockStateWithSizeWithoutStock = {
  ...mockState,
  entities: {
    ...mockState.entities,
    products: {
      ...mockState.entities.products,
      [mockProductId]: {
        ...mockState.entities.products[mockProductId],
        sizes: [{ id: 1 }],
      },
    },
  },
};

export const mockStateWithUnavailableStock = {
  ...mockState,
  entities: {
    ...mockState.entities,
    products: {
      ...mockState.entities.products,
      [mockProductId]: {
        ...mockState.entities.products[mockProductId],
        sizes: [
          {
            ...mockProductSizeAdapted,
            id: 23,
            name: '23',
            stock: [
              { ...mockProductSizeAdapted.stock[0], quantity: 0 },
            ] as SizeAdapted['stock'],
          },
        ],
      },
    },
  },
};
