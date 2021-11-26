import { mockProductId } from './ids.fixtures';

export const mockProductAttributes = [
  {
    id: 7,
    name: 'Sleeve Length',
    values: [
      {
        id: 12,
        value: 'Longsleeved',
      },
    ],
  },
  {
    id: 8,
    name: 'Neckline',
    values: [
      {
        id: 14,
        value: 'Round Neck',
      },
    ],
  },
];

export const mockProductAttributesNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        attributes: mockProductAttributes,
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
        variants: undefined,
      },
    },
  },
  result: mockProductId,
};
