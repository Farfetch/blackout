import { mockOutfitId, mockProductId } from './ids.fixtures';

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
