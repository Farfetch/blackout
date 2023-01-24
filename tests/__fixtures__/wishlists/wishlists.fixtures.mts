import { mockProductsEntity } from '../products/index.mjs';
import type { ProductEntity, StoreState } from '@farfetch/blackout-redux';
import type { WishlistItem } from '@farfetch/blackout-client';

export const mockWishlistId = 'b1a13891-6084-489f-96ed-300eed45b948';
export const mockWishlistItemId = 481426747;
export const mockProductId = 11766695;

const mockWishlistSetId = '77fae745-7608-4b7d-8e7d-4f6923e032ef';

export const mockProductImgQueryParam = '?c=2';

export const mockWishlistItem = {
  id: mockWishlistItemId,
  productId: mockProductId,
  productName: '251 sneakers',
  quantity: 2,
  createdByStaffMemberId: null,
  dateCreated: '/Date(1612194217929)/',
  brandId: 10533,
  brandName: 'Valentino',
} as WishlistItem;

export const mockWishlistsResponse = {
  count: 1,
  id: mockWishlistId,
  items: [mockWishlistItem],
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

export const wishlistItemMetadata = {
  from: 'bag',
  oldQuantity: 1,
  oldSize: 16,
};

const { productId, productName, brandId, brandName, ...wishlistItemEntity } =
  mockWishlistsResponse.items[0] || mockWishlistItem;

export const mockWishlistNormalizedPayload = {
  entities: {
    wishlistItems: {
      [mockWishlistItemId]: {
        ...wishlistItemEntity,
        dateCreated: 1612194217929,
        merchant: undefined,
        price: undefined,
      },
    },
    products: {
      [mockProductId]: {
        id: mockProductId,
      },
    },
  },
  result: {
    id: mockWishlistId,
    items: [mockWishlistItemId],
  },
};

export const mockWishlistState: StoreState = {
  wishlist: {
    error: null,
    id: mockWishlistId,
    isLoading: false,
    items: {
      ids: [mockWishlistItemId, 102],
      item: {
        error: {},
        isLoading: {},
      },
    },
    result: {
      id: mockWishlistId,
      items: [mockWishlistItemId],
      count: 4,
      userId: null,
    },
    sets: {
      error: null,
      ids: [mockWishlistSetId],
      isLoading: false,
      set: {
        error: {},
        isLoading: {},
      },
    },
  },
  entities: {
    wishlistItems: {
      [mockWishlistItemId]: {
        ...wishlistItemEntity,
        dateCreated: 1612194217929,
        product: mockProductId,
        merchant: 123,
        size: {},
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
          includingTaxes: 129.7446,
          includingTaxesWithoutDiscount: 129.7446,
          isFormatted: true,
          taxes: {
            amount: 0,
            rate: 0,
            type: 'VAT',
          },
        },
      },
      102: {
        ...wishlistItemEntity,
        dateCreated: 1612194217929,
        id: 102,
        product: 1002,
        quantity: 2,
        merchant: 123,
        size: {},
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
          includingTaxes: 129.7446,
          includingTaxesWithoutDiscount: 129.7446,
          isFormatted: true,
          taxes: {
            amount: 0,
            rate: 0,
            type: 'VAT',
          },
        },
      },
    },
    products: {
      [mockProductId]: {
        ...mockProductsEntity[mockProductId],
        id: mockProductId,
      },
      1002: {
        ...mockProductsEntity[mockProductId],
        id: 1002,
        description: 'wide leg pant',
      },
    } as Record<number, ProductEntity>,
    categories: {
      136301: { id: 136301, name: 'Shoes', gender: 1, parentId: 0 },
    },
    brands: {
      2450: {
        description:
          'Demna Gvasalia brings Balenciaga back to its creative roots.',
        id: 2450,
        name: 'Balenciaga',
        priceType: 0,
        slug: 'rockstud-sling-back-flats-12854475',
      },
    },
    wishlistSets: {
      [mockWishlistSetId]: {
        id: mockWishlistSetId,
        dateCreated: '/Date(1612194217929)/',
        name: 'set name',
        wishlistSetItems: [
          {
            quantity: 1,
            wishlistItemId: mockWishlistItemId,
            dateCreated: '/Date(1612194217929)/',
          },
        ],
      },
    },
  },
};

export const mockWishlistInitialState: StoreState = {
  wishlist: {
    error: null,
    id: null,
    isLoading: false,
    result: null,
    items: {
      ids: null,
      item: {
        error: {},
        isLoading: {},
      },
    },
    sets: {
      error: null,
      ids: null,
      isLoading: false,
      set: {
        error: {},
        isLoading: {},
      },
    },
  },
  entities: {},
};

export const expectedWishlistSetDataDenormalized = {
  ...mockWishlistState.entities!.wishlistSets![mockWishlistSetId],
  wishlistSetItems: [
    {
      ...mockWishlistState.entities!.wishlistItems![mockWishlistItemId],
      product: {
        ...mockWishlistState.entities!.products![mockProductId],
        brand: mockWishlistState.entities!.brands![2450],
        categories: [mockWishlistState.entities!.categories![136301]],
      },
    },
  ],
};

export const expectedWishlistSetsDataDenormalized = [
  expectedWishlistSetDataDenormalized,
];
