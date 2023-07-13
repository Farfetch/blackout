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
  productSlug: 'string',
  isExclusive: false,
  isCustomizable: false,
};

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

const mockSharedWishlistItemEntity = {
  attributes: undefined,
  dateCreated: 1669302883319,
  id: 481426747,
  isCustomizable: false,
  isExclusive: false,
  product: 11766695,
  quantity: 2,
  size: {},
};

export const mockSharedWishlistNormalizedPayload = {
  entities: {
    sharedWishlists: {
      [mockSharedWishlistId]: {
        dateCreated: '2022-11-24T15:14:43.319Z',
        description: 'string',
        hasMissingItems: false,
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        items: [mockSharedWishlistItemId],
        name: 'string',
      },
    },
    sharedWishlistItems: {
      [mockSharedWishlistItemId]: {
        attributes: undefined,
        dateCreated: 1669302883319,
        id: 481426747,
        isCustomizable: false,
        isExclusive: false,
        product: 11766695,
        quantity: 2,
        size: {},
      },
    },
  },
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
        ...mockSharedWishlistItemEntity,
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
        ...mockSharedWishlistItemEntity,
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
        DEPRECATED_images: undefined,
        brand: 2450,
        categories: [136301],
        colorGrouping: undefined,
        colors: undefined,
        customAttributes: undefined,
        description: 'Classic Sneakers',
        groupedEntries: undefined,
        grouping: undefined,
        groupingProperties: undefined,
        id: 11766695,
        images: undefined,
        labels: undefined,
        merchant: undefined,
        name: '505 shoes',
        price: undefined,
        sizes: undefined,
        slug: 'string',
        tag: {
          id: undefined,
          name: undefined,
        },
        variants: undefined,
      },
      1002: {
        DEPRECATED_images: undefined,
        brand: 2450,
        categories: [136301],
        colorGrouping: undefined,
        colors: undefined,
        customAttributes: undefined,
        description: 'wide leg pant',
        groupedEntries: undefined,
        grouping: undefined,
        groupingProperties: undefined,
        id: 1002,
        images: undefined,
        labels: undefined,
        merchant: undefined,
        name: '505 shoes',
        price: undefined,
        prices: undefined,
        sizes: undefined,
        slug: 'string',
        tag: {
          id: undefined,
          name: undefined,
        },
        variants: undefined,
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
    categories: {
      136301: {
        id: 136301,
        name: 'Trousers',
        gender: 'Man',
      },
    },
  },
};
