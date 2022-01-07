import { mockPriceAdaptedEmpty } from './price.fixtures';
import { mockProductId } from './ids.fixtures';

export const mockProductColorGrouping = {
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
      color: '9075 WHITE',
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
      color: '9075 PINK',
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

export const mockProductColorGroupingAdapted = {
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
      color: '9075 WHITE',
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
      color: '9075 PINK',
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

export const mockProductColorGroupingNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        colorGrouping: mockProductColorGroupingAdapted,
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
