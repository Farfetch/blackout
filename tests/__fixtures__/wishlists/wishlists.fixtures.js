export const mockWishlistId = 'b1a13891-6084-489f-96ed-300eed45b948';
export const mockWishlistItemId = 481426747;
export const mockProductId = 12129099;

const mockWishlistSetId = '77fae745-7608-4b7d-8e7d-4f6923e032ef';

export const mockWishlistsResponse = {
  count: 1,
  id: mockWishlistId,
  items: [
    {
      id: mockWishlistItemId,
      productId: mockProductId,
      productName: '251 sneakers',
      quantity: 2,
      createdByStaffMemberId: null,
      dateCreated: '/Date(1612194217929)/',
      brandId: 10533,
      brandName: 'Valentino',
    },
  ],
  userId: null,
};

export const mockWishlistItemPatchData = {
  merchantId: 11554,
  productId: mockProductId,
  quantity: 1,
  scale: 210,
  size: 18,
};

export const mockWishlistItemPostData = {
  productId: mockProductId,
  merchantId: 11554,
  quantity: 1,
  size: 18,
};

const { productId, productName, brandId, brandName, ...wishlistItemEntity } =
  mockWishlistsResponse.items[0];

export const mockWishlistNormalizedPayload = {
  entities: {
    wishlist: {
      [mockWishlistId]: {
        id: mockWishlistId,
        items: [mockWishlistItemId],
      },
    },
    wishlistItems: {
      [mockWishlistItemId]: {
        ...wishlistItemEntity,
        dateCreated: 1612194217929,
      },
    },
    products: {
      [mockProductId]: { id: mockProductId },
    },
  },
  result: mockWishlistId,
};

export const mockWishlistState = {
  wishlist: {
    error: 'error: not loaded',
    id: mockWishlistId,
    isLoading: false,
    wishlistItems: {
      error: {
        [mockWishlistItemId]: {
          code: -1,
          status: 400,
        },
      },
      isLoading: {
        [mockWishlistItemId]: true,
      },
    },
    wishlistSets: {
      error: null,
      ids: [mockWishlistSetId],
      isLoading: false,
      sets: {
        error: {
          [mockWishlistSetId]: {
            code: -1,
            status: 400,
          },
        },
        isLoading: {
          [mockWishlistSetId]: true,
        },
      },
    },
  },
  entities: {
    wishlist: {
      [mockWishlistId]:
        mockWishlistNormalizedPayload.entities.wishlist[mockWishlistId],
    },
    wishlistItems: {
      [mockWishlistItemId]: {
        ...wishlistItemEntity,
        product: mockProductId,
        dateCreated: 1612194217929,
      },
      102: { id: 102, product: 1002, quantity: 2 },
    },
    products: {
      [mockProductId]: { id: mockProductId },
      1002: { id: 1002, description: 'bar product' },
    },
    wishlistSets: {
      [mockWishlistSetId]: {
        id: mockWishlistSetId,
        name: 'set name',
        wishlistSetItems: [
          {
            quantity: 1,
            wishlistItemId: mockWishlistItemId,
          },
        ],
      },
    },
  },
};
