import { mockProductId } from './ids.fixtures';

export const mockProductSizeGuides = [
  {
    brand: {
      id: 4062,
      name: 'Alexander Wang',
    },
    maps: [
      {
        sizeScaleId: 4058,
        description: 'ALEXANDER WANG STANDARD',
        abbreviation: '',
        maps: [
          {
            description: 'XXS',
            position: 0,
          },
          {
            description: 'XXS',
            position: 1,
          },
        ],
      },
      {
        sizeScaleId: 1321,
        description: 'ALEXANDER WANG JEANS SIZE (IN)',
        abbreviation: 'IN',
        maps: [
          {
            description: '22',
            position: 0,
          },
          {
            description: '23',
            position: 1,
          },
        ],
      },
    ],
    annotations: [],
    order: 0,
  },
];

export const mockProductSizeGuidesNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        sizeGuides: mockProductSizeGuides,
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
