import * as fromWishlist from '../../reducer/wishlists.js';
import * as selectors from '../index.js';
import {
  mockProductId,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistSetId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists/index.mjs';
import { mockProductsEntity } from 'tests/__fixtures__/products/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { ProductEntity } from '../../../entities/index.js';

describe('wishlists redux selectors', () => {
  const wishlistItemEntity =
    mockWishlistNormalizedPayload.entities.wishlistItems[mockWishlistItemId];
  const mockWishlistStateEntity =
    mockWishlistState.entities!.wishlistItems![mockWishlistItemId];
  const productEntity =
    mockWishlistNormalizedPayload.entities.products[mockProductId];

  beforeEach(jest.clearAllMocks);

  describe('getWishlistId()', () => {
    it('should get the wishlist id property from state', () => {
      const spy = jest.spyOn(fromWishlist, 'getId');

      expect(selectors.getWishlistId(mockWishlistState)).toEqual(
        mockWishlistId,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlist()', () => {
    it('should get the user wishlist from state', () => {
      const spy = jest.spyOn(fromWishlist, 'getResult');

      expect(selectors.getWishlist(mockWishlistState)).toEqual(
        mockWishlistState.wishlist!.result,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistError()', () => {
    it('should get the wishlist error property from state', () => {
      const expectedResult = mockWishlistState!.wishlist!.error;
      const spy = jest.spyOn(fromWishlist, 'getError');

      expect(selectors.getWishlistError(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistLoading()', () => {
    it('should get the wishlist loading status from state', () => {
      const expectedResult = mockWishlistState!.wishlist!.isLoading;
      const spy = jest.spyOn(fromWishlist, 'getIsLoading');

      expect(selectors.isWishlistLoading(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistFetched()', () => {
    it('should return true if the wishlist fetch request succeeded', () => {
      expect(selectors.isWishlistFetched(mockWishlistState)).toBe(true);
    });

    it('should return true if the wishlist fetch request failed', () => {
      const mockStateWithError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: toBlackoutError(new Error('error')),
          id: null,
        },
      };

      expect(selectors.isWishlistFetched(mockStateWithError)).toBe(true);
    });

    it('should return false if there is an ongoing fetch request', () => {
      const mockStateLoading = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          isLoading: true,
        },
      };

      expect(selectors.isWishlistFetched(mockStateLoading)).toBe(false);
    });
  });

  describe('getWishlistItem()', () => {
    const expectedResult = {
      ...wishlistItemEntity,
      ...mockWishlistStateEntity,
      product: {
        ...mockProductsEntity[mockProductId],
        brand: mockWishlistState.entities!.brands![2450],
        categories: [mockWishlistState.entities!.categories![136301]],
      },
    };

    it('should return all data regarding a wishlist item', () => {
      expect(
        selectors.getWishlistItem(mockWishlistState, mockWishlistItemId),
      ).toEqual(expectedResult);
    });

    it('should return the wishlist item data with parent sets information', () => {
      const expectedResult = {
        ...mockWishlistState.entities!.wishlistItems![mockWishlistItemId],
        parentSets: [
          {
            id: mockWishlistSetId,
            name: mockWishlistState.entities!.wishlistSets![mockWishlistSetId]!
              .name,
          },
        ],
        product: {
          ...mockWishlistState.entities!.products![mockProductId],
          brand: mockWishlistState.entities!.brands![2450],
          categories: [mockWishlistState.entities!.categories![136301]],
        },
      };

      expect(
        selectors.getWishlistItem(mockWishlistState, mockWishlistItemId, true),
      ).toEqual(expectedResult);
    });
  });

  describe('getWishlistItemsIds()', () => {
    it("should return a list of wishlist item ID's from state", () => {
      const expectedResult = mockWishlistState.wishlist!.items.ids;

      expect(selectors.getWishlistItemsIds(mockWishlistState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getWishlistItems()', () => {
    it('should return the wishlist items content from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities!.wishlistItems![mockWishlistItemId],
          product: {
            ...mockWishlistState.entities!.products![mockProductId],
            brand: mockWishlistState.entities!.brands![2450],
            categories: [mockWishlistState.entities!.categories![136301]],
          },
        },
        {
          ...mockWishlistState.entities!.wishlistItems![mockWishlistItemId],
          id: 102,
          product: {
            ...mockProductsEntity[mockProductId],
            id: 1002,
            description: 'wide leg pant',
            brand: mockWishlistState.entities!.brands![2450],
            categories: [mockWishlistState.entities!.categories![136301]],
          },
          quantity: 2,
        },
      ];

      expect(selectors.getWishlistItems(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return the wishlist items content with parent sets information from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities!.wishlistItems![mockWishlistItemId],
          parentSets: [
            {
              id: mockWishlistSetId,
              name: mockWishlistState!.entities!.wishlistSets![
                mockWishlistSetId
              ]!.name,
            },
          ],
          product: {
            ...mockWishlistState.entities!.products![mockProductId],
            brand: mockWishlistState.entities!.brands![2450],
            categories: [mockWishlistState.entities!.categories![136301]],
          },
        },
        {
          ...mockWishlistState.entities!.wishlistItems![mockWishlistItemId],
          id: 102,
          parentSets: [],
          product: {
            ...mockProductsEntity[mockProductId],
            id: 1002,
            description: 'wide leg pant',
            brand: mockWishlistState.entities!.brands![2450],
            categories: [mockWishlistState.entities!.categories![136301]],
          },
          quantity: 2,
        },
      ];

      expect(selectors.getWishlistItems(mockWishlistState, true)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getWishlistItemsCounter()', () => {
    it('should return the wishlistItems counter when wishlistItems exists', () => {
      const expectedResult = 2;

      expect(selectors.getWishlistItemsCounter(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return 0 when does not exists wishlistItems', () => {
      const expectedResult = 0;
      const state = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          items: {
            ...mockWishlistState!.wishlist!.items,
            ids: [],
          },
        },
        entities: { wishlistItems: {} },
      };

      expect(selectors.getWishlistItemsCounter(state)).toEqual(expectedResult);
    });
  });

  describe('getWishlistTotalQuantity()', () => {
    it('should return the wishlistItems total quantity when wishlistItems exists', () => {
      const expectedResult = 4;

      expect(selectors.getWishlistTotalQuantity(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return 0 when does not exists wishlistItems', () => {
      const expectedResult = 0;
      const state = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          items: {
            ...mockWishlistState.wishlist!.items,
            ids: [],
          },
        },
        entities: { wishlistItems: {} },
      };

      expect(selectors.getWishlistTotalQuantity(state)).toEqual(expectedResult);
    });
  });

  describe('findProductInWishlist()', () => {
    it('should return the wishlist item that already exists', () => {
      const expectedResult = {
        ...wishlistItemEntity,
        ...mockWishlistStateEntity,
        product: {
          ...mockProductsEntity[mockProductId],
          brand: mockWishlistState.entities!.brands![2450],
          categories: [mockWishlistState.entities!.categories![136301]],
        },
      };

      expect(
        selectors.findProductInWishlist(mockWishlistState, {
          product: {
            ...mockProductsEntity[mockProductId],
            ...productEntity,
          },
          size: undefined,
        }),
      ).toEqual(expectedResult);
    });

    it('should return undefined if the product does not exist in the wishlist items', () => {
      const state = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          items: {
            ...mockWishlistState.wishlist!.items,
            ids: [],
          },
        },
        entities: {
          wishlistItems: undefined,
          products: undefined,
        },
      };

      expect(
        selectors.findProductInWishlist(state, {
          product: productEntity as ProductEntity,
        }),
      ).toBeUndefined();
    });
  });

  describe('isWishlistItemLoading()', () => {
    it('should get the wishlist item loading status', () => {
      const mockStatewithWishlistItemLoading = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {},
            },
          },
        },
      };

      expect(
        selectors.isWishlistItemLoading(
          mockStatewithWishlistItemLoading,
          mockWishlistItemId,
        ),
      ).toBe(true);
    });
  });

  describe('isWishlistItemFetched()', () => {
    it('should return true if the wishlist item is fetched and it is not loading', () => {
      expect(
        selectors.isWishlistItemFetched(mockWishlistState, mockWishlistItemId),
      ).toBe(true);
    });

    it('should return true if there is an error and it is not loading', () => {
      const mockStateWithWishlistItemError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {},
              error: {
                [mockWishlistItemId]: toBlackoutError(new Error('dummy error')),
              },
            },
          },
        },
      };

      expect(
        selectors.isWishlistItemFetched(
          mockStateWithWishlistItemError,
          mockWishlistItemId,
        ),
      ).toBe(true);
    });

    it('should return false if it is loading', () => {
      const mockStatewithWishlistItemLoading = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {},
            },
          },
        },
      };

      expect(
        selectors.isWishlistItemFetched(
          mockStatewithWishlistItemLoading,
          mockWishlistItemId,
        ),
      ).toBe(false);
    });
  });

  describe('getWishlistItemError()', () => {
    it('should get the wishlist item error', () => {
      const expectedResult =
        mockWishlistState.wishlist!.items.item.error[mockWishlistItemId];
      const spy = jest.spyOn(fromWishlist, 'getItemsError');

      expect(
        selectors.getWishlistItemError(mockWishlistState, mockWishlistItemId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistWithAnyError()', () => {
    it('should return true if there is a general wishlist error', () => {
      const mockStateWithGeneralError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: toBlackoutError(new Error('error: not loaded')),
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {
                [mockWishlistItemId]: null,
              },
            },
          },
        },
      };

      expect(selectors.isWishlistWithAnyError(mockStateWithGeneralError)).toBe(
        true,
      );
    });

    it('should return true if there is an error in a wishlist item', () => {
      const mockStateWithWishlistItemError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {
                [mockWishlistItemId]: toBlackoutError(new Error('error')),
              },
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStateWithWishlistItemError),
      ).toBe(true);
    });

    it('should return false if there are no errors', () => {
      const mockStateWithoutError = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {
                [mockWishlistItemId]: null,
              },
            },
          },
        },
      };

      expect(selectors.isWishlistWithAnyError(mockStateWithoutError)).toBe(
        false,
      );
    });

    it('should return false if the wishlist items are an empty array', () => {
      const mockStateWithoutWishlistItems = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [],
            item: {
              isLoading: {},
              error: {},
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStateWithoutWishlistItems),
      ).toBe(false);
    });

    it('should return false if does not exist wishlist items', () => {
      const mockStateWithoutWishlistItems = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist!,
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ...mockWishlistState.wishlist!.items,
            item: {
              isLoading: {},
              error: {},
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStateWithoutWishlistItems),
      ).toBe(false);
    });
  });

  describe('isProductInWishlist()', () => {
    it('should return true if there is a product with the same product id', () => {
      expect(
        selectors.isProductInWishlist(mockWishlistState, mockProductId),
      ).toBe(true);
    });

    it('should return false if found nothing', () => {
      const randomProductId = 958675864;

      expect(
        selectors.isProductInWishlist(mockWishlistState, randomProductId),
      ).toBe(false);
    });
  });

  describe('getWishlistItemsByProductId()', () => {
    it('should return items with the same product id', () => {
      const mockState = {
        wishlist: {
          ...mockWishlistState.wishlist!,
          items: {
            ...mockWishlistState.wishlist!.items,
            ids: [mockWishlistItemId, 102, 103],
          },
        },
        entities: {
          ...mockWishlistState.entities,
          wishlistItems: {
            ...mockWishlistState.entities!.wishlistItems,
            103: {
              ...mockWishlistState.entities!.wishlistItems![
                mockWishlistItemId
              ]!,
              product: mockProductId,
            },
          },
        },
      };

      expect(
        selectors.getWishlistItemsByProductId(mockState, mockProductId),
      ).toHaveLength(2);
    });

    it('should return false if found nothing', () => {
      const randomProductId = 958675864;

      expect(
        selectors.getWishlistItemsByProductId(
          mockWishlistState,
          randomProductId,
        ),
      ).toHaveLength(0);
    });
  });
});
