import { mockPriceAdaptedEmpty } from './price.fixtures';
import { mockProductId, mockVariantId } from './ids.fixtures';
import { PurchaseChannel } from '@farfetch/blackout-client';
import type { VariantsAdapted } from '@farfetch/blackout-redux';

export const mockProductVariantsMerchantsLocations = [
  { merchantLocationId: 1, quantity: 0, variantId: mockVariantId },
  { merchantLocationId: 2, quantity: 1, variantId: '123' },
  { merchantLocationId: 3, quantity: 99, variantId: '456' },
];

export const mockProductVariants: VariantsAdapted = [
  {
    id: mockVariantId,
    merchantId: 10948,
    price: {
      ...mockPriceAdaptedEmpty,
      formatted: {
        ...mockPriceAdaptedEmpty.formatted,
        includingTaxes: '$666',
        includingTaxesWithoutDiscount: '$666',
      },
      includingTaxes: 666,
      includingTaxesWithoutDiscount: 666,
      isFormatted: true,
    },
    size: '25',
    merchantsLocations: mockProductVariantsMerchantsLocations,
    attributes: [],
    availableAt: [],
    formattedPrice: '$666',
    formattedPriceWithoutDiscount: '$666',
    purchaseChannel: PurchaseChannel.EmailOnly,
    quantity: 1,
    scale: 'dummy_scale',
    scaleAbbreviation: 'dummy_scale_abbreviation',
    sizeDescription: 'dummy_size_description',
    isOneSize: true,
  },
];

export const mockProductVariantsMerchantsLocationsNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        customAttributes: undefined,
        groupedEntries: undefined,
        images: undefined,
        merchant: undefined,
        price: mockPriceAdaptedEmpty,
        prices: undefined,
        sizes: undefined,
        tag: {
          id: undefined,
          name: undefined,
        },
        variants: [
          {
            attributes: [],
            availableAt: [],
            formattedPrice: '$666',
            formattedPriceWithoutDiscount: '$666',
            id: mockVariantId,
            merchantId: 10948,
            merchantsLocations: mockProductVariantsMerchantsLocations,
            price: {
              ...mockPriceAdaptedEmpty,
              formatted: {
                ...mockPriceAdaptedEmpty.formatted,
                includingTaxes: '$666',
                includingTaxesWithoutDiscount: '$666',
              },
              includingTaxes: 666,
              includingTaxesWithoutDiscount: 666,
            },
            size: '25',
            isOneSize: true,
            quantity: 1,
            scale: 'dummy_scale',
            scaleAbbreviation: 'dummy_scale_abbreviation',
            sizeDescription: 'dummy_size_description',
            purchaseChannel: PurchaseChannel.EmailOnly,
          },
        ],
      },
    },
  },
  result: mockProductId,
};
