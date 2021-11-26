import { mockProductId } from './ids.fixtures';

export const mockProductVariantsMeasurements = [
  {
    attributes: [
      {
        type: 0,
        value: '17',
        description: 'Size',
      },
      {
        type: 1,
        value: '34',
        description: 'SizeDescription',
      },
    ],
    measurements: [],
  },
];

export const mockProductVariantsMeasurementsNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        measurements: mockProductVariantsMeasurements,
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
