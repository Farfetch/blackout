import { mockWishlistItemId } from './wishlists.fixtures.mjs';
import type { PatchWishlistSetData } from '@farfetch/blackout-client';

export const mockWishlistSetId = '77fae745-7608-4b7d-8e7d-4f6923e032ef';

export const mockWishlistsSetResponse = {
  setId: mockWishlistSetId,
  name: 'My wishlist for summer 2021',
  description: '(in case I can go out)',
  dateCreated: '2020-03-19T18:16:20.389Z',
  createdByStaffMemberId: '00000000-0000-0000-0000-000000000000',
  wishlistSetItems: [
    {
      wishlistItemId: mockWishlistItemId,
      dateCreated: '2020-03-19T18:16:20.389Z',
      createdByStaffMemberId: '00000000-0000-0000-0000-000000000000',
    },
  ],
};

export const mockWishlistSetPatchData: PatchWishlistSetData = [
  {
    value: {},
    path: 'string',
    op: 'replace',
  },
];

const { setId, ...mockWishlistsSetResponseWithoutSetId } =
  mockWishlistsSetResponse;

export const mockWishlistSets = {
  [mockWishlistSetId]: {
    ...mockWishlistsSetResponseWithoutSetId,
    id: mockWishlistSetId,
  },
};

export const mockWishlistsSetNormalizedPayload = {
  entities: {
    wishlistSets: mockWishlistSets,
  },
  result: mockWishlistSetId,
};
