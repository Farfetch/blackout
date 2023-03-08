import { mockPriceAdaptedEmpty } from './price.fixtures.mjs';
import { mockProductId } from './ids.fixtures.mjs';

export const mockProductFittings = [
  {
    type: 'Size Selection',
    description:
      'This piece fits true to size. We recommend you get your regular size',
  },
  {
    type: 'Overall fit',
    description: 'Cut for a slim fit',
  },
  {
    type: 'Fabric weight & type',
    description: 'Made with a mid-weight fabric',
  },
];

export const mockProductFittingsNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        fittings: mockProductFittings,
        colorGrouping: undefined,
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
