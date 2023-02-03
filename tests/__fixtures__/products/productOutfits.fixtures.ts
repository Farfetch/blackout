import { mockOutfitId, mockProductId } from './ids.fixtures';
import { mockPriceAdaptedEmpty } from './price.fixtures';

export const mockProductOutfits = [
  {
    id: mockOutfitId,
    mainProductId: mockProductId,
    description: 'string',
    countryId: 0,
    dateCreated: '2023-01-30T15:32:49.623Z',
    onlineState: 0,
    targetTenantId: 50000,
    products: [
      {
        outfitId: mockOutfitId,
        productId: mockProductId,
      },
    ],
  },
];

export const mockProductOutfitsNormalizedResponse = {
  entities: {
    products: {
      [mockProductId]: {
        id: mockProductId,
        fittings: undefined,
        outfits: mockProductOutfits,
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
