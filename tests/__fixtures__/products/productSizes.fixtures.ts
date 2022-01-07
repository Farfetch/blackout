import { mockMerchantId, mockProductId, mockSizeScaleId } from './ids.fixtures';
import { mockPriceAdaptedEmpty } from './price.fixtures';

export const mockProductSizes = [
  {
    sizeId: '21',
    sizeDescription: '36',
    scale: '206',
    scaleAbbreviation: 'IT',
    isOneSize: false,
    variants: [
      {
        merchantId: 11554,
        formattedPrice: '4 300 €',
        formattedPriceWithoutDiscount: '4 300 €',
        quantity: 2,
        barcodes: ['2013323497172'],
      },
    ],
  },
];

export const mockProductSizeAdapted = {
  id: 1,
  globalQuantity: 10,
  scale: mockSizeScaleId,
  stock: [
    { merchantId: mockMerchantId, quantity: 2 },
    { merchantId: 788, quantity: 8 },
  ],
  isOneSize: false,
  isOutOfStock: false,
  name: '39',
};

export const mockProductSizesAdapted = [
  mockProductSizeAdapted,
  {
    id: 2,
    globalQuantity: 10,
    scale: mockSizeScaleId,
    stock: [{ merchantId: mockMerchantId, quantity: 2 }],
    isOneSize: false,
    isOutOfStock: false,
    name: '40',
  },
  {
    id: 3,
    name: '12',
    scale: 'IT',
    stock: [{ merchantId: 333, quantity: 2 }],
  },
  {
    id: 4,
    name: '13',
    scale: 4,
    stock: [{ merchantId: mockMerchantId, quantity: 6 }],
  },
  {
    id: 5,
    scale: 5,
    stock: [
      { merchantId: 545, quantity: 0 },
      { merchantId: mockMerchantId, quantity: 2 },
      { merchantId: 896, quantity: 4 },
    ],
  },
  {
    id: 6,
    globalQuantity: 44,
    scale: mockSizeScaleId,
    stock: [{ merchantId: mockMerchantId, quantity: 7 }],
    isOneSize: false,
    isOutOfStock: false,
    name: '41',
  },
  {
    id: 7,
    globalQuantity: 1,
    scale: mockSizeScaleId,
    stock: [{ merchantId: mockMerchantId, quantity: 1 }],
    isOneSize: false,
    isOutOfStock: false,
    name: '43',
  },
  {
    id: 8,
    globalQuantity: 3,
    scale: mockSizeScaleId,
    stock: [
      { merchantId: mockMerchantId, quantity: 1 },
      { merchantId: 22, quantity: 2 },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '44',
  },
  {
    id: 23,
    name: '23',
    scale: 'IT',
    stock: [
      { merchantId: mockMerchantId, quantity: 7 },
      { merchantId: 213, quantity: 5 },
      { merchantId: 456, quantity: 2 },
    ],
  },
];

export const mockOneSizeSizes = [
  {
    ...mockProductSizeAdapted,
    isOneSize: true,
  },
];

export const mockOutOfStockSizes = [
  ...mockProductSizesAdapted,
  {
    ...mockProductSizeAdapted,
    isOutOfStock: true,
  },
];

export const mockProductSizesNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        sizes: [
          {
            globalQuantity: 2,
            id: 21,
            isOneSize: false,
            isOutOfStock: false,
            name: '36',
            scale: 206,
            scaleAbbreviation: 'IT',
            scaleDescription: undefined,
            stock: [
              {
                barcodes: ['2013323497172'],
                merchantId: 11554,
                price: {
                  formatted: {
                    includingTaxes: '4 300 €',
                    includingTaxesWithoutDiscount: '4 300 €',
                  },
                },
                purchaseChannel: null,
                quantity: 2,
              },
            ],
          },
        ],
        colorGrouping: undefined,
        customAttributes: undefined,
        groupedEntries: undefined,
        images: undefined,
        merchant: undefined,
        price: mockPriceAdaptedEmpty,
        prices: undefined,
        tag: {
          id: undefined,
          name: undefined,
        },
        variants: undefined,
      },
    },
  },
  result: mockProductId,
};
