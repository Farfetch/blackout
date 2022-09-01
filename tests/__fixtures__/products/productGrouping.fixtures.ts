import { mockPriceAdaptedEmpty } from './price.fixtures';
import { mockProductId } from './ids.fixtures';
import { VariationPropertyType } from '@farfetch/blackout-client';

export const mockProductGrouping = {
  entries: [
    {
      digitalAssets: [
        {
          mediaType: 'image/jpeg',
          displayOrder: 1,
          size: '54',
          url: 'https://api.blackout.com/14/26/08/35/14260835_20007113_54.jpg',
          type: 0,
        },
      ],
      variationProperties: [
        {
          type: VariationPropertyType.Volume,
          property: {
            id: '6cbc34da-e44c-49c2-9e2e-c4511f494d61',
            value: '10 ml',
          },
        },
      ],
      slug: 'woman-scarf-14260835',
      hasStock: true,
      id: 14260832,
      order: 1,
      isDefault: true,
      variantId: null,
    },
    {
      digitalAssets: [
        {
          mediaType: 'image/jpeg',
          displayOrder: 1,
          size: '54',
          url: 'https://api.blackout.com/14/26/08/34/14260834_20007111_54.jpg',
          type: 0,
        },
      ],
      variationProperties: [
        {
          type: VariationPropertyType.Volume,
          property: {
            id: '6cbc34da-e44c-49c2-9e2e-c4511f494d61',
            value: '20 ml',
          },
        },
      ],
      slug: 'woman-scarf-14260834',
      hasStock: true,
      id: 14260833,
      order: 1,
      isDefault: null,
      variantId: null,
    },
  ],
  number: 0,
  totalItems: 2,
  totalPages: 1,
};

export const mockProductGroupingAdapted = {
  entries: [
    {
      digitalAssets: [
        {
          mediaType: 'image/jpeg',
          displayOrder: 1,
          size: '54',
          url: 'https://api.blackout.com/14/26/08/35/14260835_20007113_54.jpg',
          type: 0,
          order: 1,
          sources: {
            54: 'https://api.blackout.com/14/26/08/35/14260835_20007113_54.jpg',
          },
        },
      ],
      variationProperties: [
        {
          type: VariationPropertyType.Volume,
          property: {
            id: '6cbc34da-e44c-49c2-9e2e-c4511f494d61',
            value: '10 ml',
          },
        },
      ],
      slug: 'woman-scarf-14260835',
      hasStock: true,
      id: 14260832,
      order: 1,
      isDefault: true,
      variantId: null,
    },
    {
      digitalAssets: [
        {
          mediaType: 'image/jpeg',
          displayOrder: 1,
          size: '54',
          url: 'https://api.blackout.com/14/26/08/34/14260834_20007111_54.jpg',
          type: 0,
          order: 1,
          sources: {
            54: 'https://api.blackout.com/14/26/08/34/14260834_20007111_54.jpg',
          },
        },
      ],
      variationProperties: [
        {
          type: VariationPropertyType.Volume,
          property: {
            id: '6cbc34da-e44c-49c2-9e2e-c4511f494d61',
            value: '20 ml',
          },
        },
      ],
      slug: 'woman-scarf-14260834',
      hasStock: true,
      id: 14260833,
      order: 1,
      isDefault: null,
      variantId: null,
    },
  ],
  number: 0,
  totalItems: 2,
  totalPages: 1,
};

export const mockProductGroupingNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        grouping: {
          '?pagesize=10': mockProductGroupingAdapted,
        },
        groupingProperties: undefined,
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
        variants: undefined,
      },
    },
  },
  result: mockProductId,
};
