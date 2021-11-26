import { mockProductId, mockVariantId } from './ids.fixtures';

export const mockProductVariantsByMerchantsLocations = [
  { merchantLocationId: 1, quantity: 0, variantId: mockVariantId },
  { merchantLocationId: 2, quantity: 1, variantId: 123 },
  { merchantLocationId: 3, quantity: 99, variantId: 456 },
];

export const mockProductVariants = [
  {
    id: mockVariantId,
    merchantId: 10948,
    price: {
      formatted: {
        includingTaxes: '$666',
      },
    },
    size: '25',
    merchantsLocations: mockProductVariantsByMerchantsLocations,
  },
];

export const mockProductVariantsByMerchantsLocationsNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        variants: [
          {
            id: mockVariantId,
            merchantId: 10948,
            size: '25',
            merchantsLocations: mockProductVariantsByMerchantsLocations,
          },
        ],
        colorGrouping: undefined,
        customAttributes: undefined,
        groupedEntries: undefined,
        images: undefined,
        merchant: undefined,
        price: undefined,
        prices: undefined,
        sizes: undefined,
        tag: {
          id: undefined,
          name: undefined,
        },
      },
    },
  },
  result: mockProductId,
};
