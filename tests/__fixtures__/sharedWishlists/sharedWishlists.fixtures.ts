import { mockProductsEntity } from '../products';
import type { SharedWishlistItem } from '@farfetch/blackout-client';

export const mockSharedWishlistId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const mockSharedWishlistItemId = 481426747;
export const mockProductId = 11766695;
export const mockProductImgQueryParam = '?c=2';

export const mockSharedWishlistItem = {
  id: mockSharedWishlistItemId,
  productId: mockProductId,
  productName: '251 sneakers',
  productDescription: 'Modern Sneakers',
  quantity: 2,
  dateCreated: '2022-11-24T15:14:43.319Z',
  brandId: 10533,
  brandName: 'Valentino',
} as SharedWishlistItem;

export const mockSharedWishlistsResponse = {
  id: mockSharedWishlistId,
  name: 'string',
  description: 'string',
  hasMissingItems: false,
  dateCreated: '2022-11-24T15:14:43.319Z',
  items: [mockSharedWishlistItem],
};

export const mockSharedWishlistPostData = {
  wishlistId: 'b1a13891-6084-489f-96ed-300eed45b948',
  wishlistSetId: '77fae745-7608-4b7d-8e7d-4f6923e032ef',
};

const {
  productId,
  brandId,
  brandName,
  productDescription,
  productName,
  ...sharedWishlistItemEntity
} = mockSharedWishlistsResponse.items[0] || mockSharedWishlistItem;

export const mockSharedWishlistNormalizedPayload = {
  entities: {
    sharedWishlists: {
      [mockSharedWishlistId]: {
        ...mockSharedWishlistsResponse,
        items: [mockSharedWishlistItemId],
      },
    },
    sharedWishlistItems: {
      [mockSharedWishlistItemId]: {
        ...sharedWishlistItemEntity,
        dateCreated: 1669302883319,
      },
    },
  },
  result: mockSharedWishlistId,
};

export const mockSharedWishlistState = {
  sharedWishlist: {
    error: null,
    isLoading: false,
    result: mockSharedWishlistId,
  },
  entities: {
    sharedWishlists: {
      [mockSharedWishlistId]: {
        ...mockSharedWishlistsResponse,
        items: [mockSharedWishlistItemId, 102],
      },
    },
    sharedWishlistItems: {
      [mockSharedWishlistItemId]: {
        ...sharedWishlistItemEntity,
        dateCreated: 1669302883319,
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
            rate: undefined,
            amount: undefined,
            type: undefined,
          },
        },
      },
      102: {
        ...sharedWishlistItemEntity,
        dateCreated: 1669302883319,
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
            rate: undefined,
            amount: undefined,
            type: undefined,
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
  },
};
