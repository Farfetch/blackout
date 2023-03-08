import {
  mockMerchantId,
  mockProductId,
  mockSizeScaleId,
} from './ids.fixtures.mjs';
import { mockPriceAdaptedEmpty } from './price.fixtures.mjs';

export const mockProductSizes = [
  {
    sizeId: '21',
    sizeDescription: '36',
    scale: '206',
    scaleAbbreviation: 'IT',
    isOneSize: false,
    sizeOrder: '17',
    variants: [
      {
        merchantId: 11554,
        formattedPrice: '4 300 €',
        formattedPriceWithoutDiscount: '4 300 €',
        quantity: 2,
        barcodes: ['2013323497172'],
        priceInclTaxes: 4300,
        priceInclTaxesWithoutDiscount: 4300,
      },
    ],
  },
];

export const mockProductSizeAdapted = {
  id: 1,
  globalQuantity: 10,
  scale: mockSizeScaleId,
  scaleAbbreviation: 'it',
  scaleDescription: 'italian',
  stock: [
    {
      merchantId: mockMerchantId,
      quantity: 2,
      barcodes: [],
      price: {
        formatted: {
          includingTaxes: '$129.74',
          includingTaxesWithoutDiscount: '$129.74',
        },
      },
      purchaseChannel: null,
    },
    {
      merchantId: 788,
      quantity: 8,
      barcodes: [],
      price: {
        formatted: {
          includingTaxes: '$129.74',
          includingTaxesWithoutDiscount: '$129.74',
        },
      },
      purchaseChannel: null,
    },
  ],
  isOneSize: false,
  isOutOfStock: false,
  name: '39',
};

export const mockProductSizesAdapted = [
  mockProductSizeAdapted,
  {
    id: 2,
    globalQuantity: 22,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: 545,
        quantity: 20,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '40',
  },
  {
    id: 3,
    globalQuantity: 2,
    name: '12',
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: 333,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
  },
  {
    id: 4,
    name: '13',
    globalQuantity: 6,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 6,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
  },
  {
    id: 5,
    globalQuantity: 6,
    scale: 5,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: 545,
        quantity: 0,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: mockMerchantId,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: 896,
        quantity: 4,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '43',
  },
  {
    id: 6,
    globalQuantity: 44,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 7,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '41',
  },
  {
    id: 7,
    globalQuantity: 1,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 1,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '43',
  },
  {
    id: 8,
    globalQuantity: 3,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 1,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: 22,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '44',
  },
  {
    id: 23,
    name: '23',
    globalQuantity: 14,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 7,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: 213,
        quantity: 5,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: 456,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
  },
  {
    id: 24,
    globalQuantity: 30,
    scale: mockSizeScaleId,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    stock: [
      {
        merchantId: 22,
        quantity: 10,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
      {
        merchantId: 22,
        quantity: 20,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '45',
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
